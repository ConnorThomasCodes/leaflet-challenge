// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a map object.
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

var legend = L.control({position:"bottomright"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML += '<i style="background: #CC0000"></i><span>90+</span><br>';
    div.innerHTML += '<i style="background: #FF8000"></i><span>60 - 90</span><br>';
    div.innerHTML += '<i style="background: #FFFF00"></i><span>30 - 60</span><br>';
    div.innerHTML += '<i style="background: #80FF00"></i><span>0 - 30</span><br>';
    div.innerHTML += '<i style="background: #00FF00"></i><span>-10 - 0</span><br>';
    return div;
};

legend.addTo(myMap);

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
});
  
function createFeatures(earthquakeData) {
    for (feature of earthquakeData) {
        var color = "";
        if (feature.geometry.coordinates[2] > 90) {
          color = "#CC0000";
        }
        else if (feature.geometry.coordinates[2] > 60) {
            color = "#FF8000";
        }
        else if (feature.geometry.coordinates[2] > 30) {
            color = "#FFFF00";
        }
        else if (feature.geometry.coordinates[2] > 0) {
          color = "#80FF00";
        }
        else {
          color = "#00FF00";
        }
        // Add circles to the map.
        L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: color,
            fillColor: color,
            // Adjust the radius.
            radius: Math.sqrt(Math.abs(feature.properties.mag)) * 20000
        }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}, Depth: ${feature.geometry.coordinates[2]}</p>`).addTo(myMap);
    }
}
