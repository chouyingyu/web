let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(0, 0), // 中心位置可以設定為更合適的緯度和經度
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

// Loop through the results array and place a marker for each set of coordinates.
function displayEarthquakes(data) {
  data.features.forEach(feature => {
    const coords = feature.geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    const magnitude = feature.properties.mag;
    const place = feature.properties.place;

    // Create a marker for each earthquake using AdvancedMarkerElement
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: latLng,
      map: map,
      content: createMarkerContent(magnitude, place), // Custom content for marker
    });
  });
}

// Create custom content for marker
function createMarkerContent(magnitude, place) {
  const div = document.createElement('div');
  div.innerHTML = `<strong>Magnitude: ${magnitude}</strong><br/>Location: ${place}`;
  return div;
}

window.initMap = initMap;
