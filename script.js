let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: "terrain",
  });

  // Fetch earthquake data from the USGS GeoJSON API
  fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson")
    .then(response => response.json())
    .then(data => {
      displayEarthquakes(data);
    })
    .catch(error => console.error("Error fetching earthquake data:", error));
}
