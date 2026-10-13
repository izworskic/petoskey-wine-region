const WEEK=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const minutes=s=>{if(!/^\d{2}:\d{2}$/.test(s||""))return null;const [h,m]=s.split(":").map(Number);return h<24&&m<60?h*60+m:null;};
export const clockLabel=n=>(Math.floor(n/60)%12||12)+":"+String(n%60).padStart(2,"0")+(Math.floor(n/60)>=12?" PM":" AM");
const miles=(a,b)=>{const r=Math.PI/180,k=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lng-a.lng)*r/2)**2;return 2*3958.8*Math.asin(Math.sqrt(k));};
// Cautious planning buffer only. Never equate to an actual drive ETA.
const legMinutes=(a,b)=>Math.ceil(8+miles(a,b)*3.2);
export const CLUSTERS={
  "petoskey":{name:"Petoskey area",note:"Local Petoskey farms and tasting rooms; leave time for the bay."},
  "walloon":{name:"Walloon Lake and Boyne",note:"An intentionally tight tasting day, not a drive all the way to Vanderbilt."},
  "harbor-alanson":{name:"Harbor Springs and Alanson",note:"The Tunnel of Trees is a separate scenic drive, not a shortcut between tastings."},
  "charlevoix":{name:"Charlevoix and the western trail",note:"The Chain of Lakes wineries form a long corridor. Keep the day focused."}
};
export function wineryCluster(v,cluster){
  if(v.category!=="winery")return false;
  if(cluster==="walloon")return ["walloon-lake-winery","rudbeckia","boyne-valley-vineyards"].includes(v.id);
  if(cluster==="petoskey")return v.area==="petoskey";
  return v.area===cluster && v.id!=="vanderbilt-vines";
}
function wineScore(v,priority){
  let n=20;
  if(priority==="wine")n+=(v.tags||[]).filter(t=>["cold-hardy","marquette","frontenac","estate-grown"].includes(t)).length*8+Math.min(3,(v.specialties||[]).length)*3;
  if(priority==="food")n+=v.food&&!/light|snack/i.test(v.food)?28:v.food?12:0;
  if(priority==="views")n+=["bay","lake","hilltop","vineyard"].includes(v.view)?25:0;
  if(priority==="distinctive")n+=(v.specialties||[]).length*6+(/farm|sugarbush|estate|historic/i.test(v.note||"")?8:0);
  return n;
}
const combinations=(arr,n,start=0,prefix=[],out=[])=>{if(prefix.length===n){out.push(prefix);return out;}for(let i=start;i<arr.length;i++)combinations(arr,n,i+1,[...prefix,arr[i]],out);return out;};
const orders=arr=>arr.length===2?[[arr[0],arr[1]],[arr[1],arr[0]]]:[[arr[0],arr[1],arr[2]],[arr[0],arr[2],arr[1]],[arr[1],arr[0],arr[2]],[arr[1],arr[2],arr[0]],[arr[2],arr[0],arr[1]],[arr[2],arr[1],arr[0]]];
export function evaluatePetoskeyRoute({stops,date,firstArrival="11:00",hoursAvailable=4}){
  const start=minutes(firstArrival),day=WEEK[new Date(date+"T12:00:00").getDay()];
  if(!day||start==null||!stops?.length)return {feasible:false,reason:"Choose a date, arrival and stops."};
  let now=start,unknown=0,drive=0;const schedule=[];
  for(const [i,v] of stops.entries()){
    if(i){const d=legMinutes(stops[i-1],v);drive+=d;now+=d;}
    const h=v.hours?.[day];
    if(v.status&&v.status!=="open")return {feasible:false,reason:v.name+" is unavailable."};
    if(!v.needsHours&&(!h||h.closed||!h.open||!h.close))return {feasible:false,reason:v.name+" has no posted open hours on "+day+"."};
    let state="POSTED";
    if(v.needsHours||!h?.open||!h?.close){state="UNKNOWN";unknown++;}
    else {const opening=minutes(h.open),closing=minutes(h.close);if(opening==null||closing==null||opening>=closing)return {feasible:false,reason:"Hours require verification."};now=Math.max(opening,now);if(now+(v.dwellMinutes||45)>closing)return {feasible:false,reason:v.name+" closes before the proposed tasting finishes."};}
    const arrive=now;now+=(v.dwellMinutes||45);
    if(now>start+hoursAvailable*60)return {feasible:false,reason:"Cannot finish the stops within your time budget."};
    schedule.push({id:v.id,arrive:clockLabel(arrive),leave:clockLabel(now),state});
  }
  return {feasible:true,state:unknown?"CALL_AHEAD":"POSTED_HOURS_FIT",unknown,schedule,driveMinutes:drive,finish:clockLabel(now),totalMinutes:now-start};
}
export function choosePetoskeyDay({venues,date,cluster="petoskey",priority="wine",firstArrival="11:00",hoursAvailable=4,stopCount=2}){
  const available=venues.filter(v=>wineryCluster(v,cluster));
  const candidates=[];
  for(const set of combinations(available,stopCount))for(const route of orders(set)){
    const fit=evaluatePetoskeyRoute({stops:route,date,firstArrival,hoursAvailable});
    if(!fit.feasible)continue;
    const preference=route.reduce((n,v)=>n+wineScore(v,priority),0)/route.length;
    const score=preference-fit.driveMinutes*.25-fit.unknown*7;
    candidates.push({route,...fit,score});
  }
  candidates.sort((a,b)=>a.unknown-b.unknown||b.score-a.score||a.totalMinutes-b.totalMinutes);
  return {choice:candidates[0]||null,available:available.length,clusterName:CLUSTERS[cluster]?.name||"Petoskey",scenarios:candidates.length};
}
