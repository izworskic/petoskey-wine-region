"use client";
import {useMemo,useState} from "react";
import venues from "@/data/venues.json";
import {choosePetoskeyDay,CLUSTERS} from "@/lib/petoskey-day-choice.mjs";

const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");};
const toMapsUrl=route=>{
  const points=route.map(v=>v.lat+","+v.lng);
  let url="https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(points[0])+"&destination="+encodeURIComponent(points[points.length-1])+"&travelmode=driving";
  if(points.length>2)url+="&waypoints="+encodeURIComponent(points.slice(1,-1).join("|"));
  return url;
};
export default function PetoskeyDayLens({initialCluster="petoskey"}){
  const [cluster,setCluster]=useState(CLUSTERS[initialCluster]?initialCluster:"petoskey");
  const [date,setDate]=useState(today);
  const [firstArrival,setFirstArrival]=useState("11:00");
  const [hoursAvailable,setHoursAvailable]=useState(4);
  const [stopCount,setStopCount]=useState(2);
  const [priority,setPriority]=useState("wine");
  const result=useMemo(()=>choosePetoskeyDay({venues,date,cluster,priority,firstArrival,hoursAvailable,stopCount}),[date,cluster,priority,firstArrival,hoursAvailable,stopCount]);
  const day=result.choice;
  return <section className="wine-v5 petoskey-day-lens" aria-labelledby="petoskey-day-lens-title">
    <p className="wine-v5-kicker">The realistic tasting day</p>
    <h2 id="petoskey-day-lens-title">Which stops can actually fit your day?</h2>
    <p>Petoskey's tasting rooms can be far apart, and published hours are uneven. This view rejects published-hours conflicts, checks your time window, and flags anything you still need to confirm by phone.</p>
    <div className="petoskey-day-inputs">
      <label>Cluster<select value={cluster} onChange={e=>setCluster(e.target.value)}>{Object.entries(CLUSTERS).map(([id,v])=><option key={id} value={id}>{v.name}</option>)}</select></label>
      <label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
      <label>First winery arrival<select value={firstArrival} onChange={e=>setFirstArrival(e.target.value)}>{["10:00","11:00","12:00","13:00","14:00"].map(h=><option key={h} value={h}>{h}</option>)}</select></label>
      <label>Hours after arrival<select value={hoursAvailable} onChange={e=>setHoursAvailable(Number(e.target.value))}><option value={3}>3 hours</option><option value={4}>4 hours</option><option value={6}>6 hours</option><option value={8}>8 hours</option></select></label>
      <label>Tasting stops<select value={stopCount} onChange={e=>setStopCount(Number(e.target.value))}><option value={2}>2 wineries, relaxed</option><option value={3}>3 wineries</option></select></label>
      <label>What matters?<select value={priority} onChange={e=>setPriority(e.target.value)}><option value="wine">Cold-climate wine</option><option value="food">Food with wine</option><option value="views">Scenery</option><option value="distinctive">Something distinctive</option></select></label>
    </div>
    <p className="petoskey-day-place">{CLUSTERS[cluster].note}</p>
    {day?<div className="petoskey-day-result" aria-live="polite">
      <div className="petoskey-day-status" data-state={day.state}><strong>{day.state==="CALL_AHEAD"?"A possible day: confirm hours":"Fits posted weekly hours"}</strong><span>{day.state==="CALL_AHEAD"?day.unknown+" stop(s) need direct confirmation before this route is dependable.":"Posted weekday hours fit, but holiday schedules and bookings are not confirmed."}</span></div>
      <ol className="petoskey-day-stops">{day.route.map((v,i)=><li key={v.id}>
        <span className="petoskey-day-time">{day.schedule[i].arrive} to {day.schedule[i].leave}</span>
        <strong>{v.name}</strong>
        <span>{v.note}</span>
        <span className="petoskey-day-hour-state">{day.schedule[i].state==="UNKNOWN"?"Hours unconfirmed - call winery":"Based on posted weekly hours"}{v.seasonal?" - Seasonal hours notice applies":""}</span>
        <span><a href={v.website} rel="noopener noreferrer" target="_blank">Official winery site</a> · <a href={v.mapsUrl} rel="noopener noreferrer" target="_blank">Map stop</a></span>
      </li>)}</ol>
      <div className="petoskey-day-actions"><a href={toMapsUrl(day.route)} target="_blank" rel="noopener noreferrer">Verify actual road directions</a><span>Last winery departure: <strong>{day.finish}</strong></span></div>
      <p className="petoskey-day-fine">Travel between stops is a conservative geographic-distance planning buffer of approximately {day.driveMinutes} minutes, not a road-route ETA. This excludes driving to the first winery, food and extra activities. Recheck winery hours, seasonal changes and tasting reservations. Choose a designated driver or a tour operator.</p>
    </div>:<div className="petoskey-day-no-fit" role="status"><h3>No responsible {stopCount}-winery suggestion fits these inputs.</h3><p>Try a shorter winery count, different date, earlier arrival or longer time budget. The map can still show the venues, but we will not represent closed or overtime stops as a workable day.</p></div>}
  </section>;
}
