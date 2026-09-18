export function trackWineEvent(name, data = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.va === "function") {
      window.va("event", { name, data });
    }
  } catch {
    // Analytics must never interfere with trip planning.
  }
}
