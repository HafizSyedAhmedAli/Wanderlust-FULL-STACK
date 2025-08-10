document.addEventListener("DOMContentLoaded", () => {
  // 1) initialize map
  const lon = coordinates[0];
  const lat = coordinates[1];
  const latlon = [lat, lon];
  const map = L.map("map").setView(latlon, 9);

  // 2) add base tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    color: "black",
  }).addTo(map);

  const blackIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // 3) add a placeholder marker now
  const marker = L.marker(latlon, { icon: blackIcon }).addTo(map);
  //   .bindPopup("Loading place name...")
  //   .openPopup();

  const reverseURL = new URL("https://nominatim.openstreetmap.org/reverse");
  reverseURL.search = new URLSearchParams({
    format: "json",
    lat: String(lat),
    lon: String(lon),
    zoom: 19,
    addressdetails: "1",
    "accept-language": "en",
  }).toString();

  fetch(reverseURL)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      console.log("reverse:", data);
      L.marker(latlon, { icon: blackIcon })
        .addTo(map)
        .bindPopup(
          `<h4>${title}</h4><p>Exact location will be provided after booking</p>`
        );
    })
    .catch((err) => console.error("reverse error:", err));
});
