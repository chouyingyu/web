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

function displayEarthquakes(data) {
    // Clear previous data
    document.getElementById("earthquake-data").innerHTML = '';

    // Loop through earthquake features
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

        // Display earthquake information
        const earthquakeInfo = document.createElement('div');
        earthquakeInfo.innerHTML = `Magnitude: ${magnitude}, Location: ${place}`;
        document.getElementById("earthquake-data").appendChild(earthquakeInfo);
    });
}

// Create custom content for marker
function createMarkerContent(magnitude, place) {
    const div = document.createElement('div');
    div.innerHTML = `<strong>Magnitude: ${magnitude}</strong><br/>Location: ${place}`;
    return div;
}

window.initMap = initMap;

