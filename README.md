# leaflet-challenge

In this repository, we access earthquake data from the USGS GeoJSON feed at <https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson>. After using d3 to parse this data in JavaScript, we then mapped all earthquakes according to their latitude and longitude with marker size and color determined by the earthquake's magnitude and depth, respectively. A legend and marker popups are added for ease of viewing (legend CSS and code framework from <https://codepen.io/haakseth/pen/KQbjdO>). The completed map is then sent into an html file for viewing on the web.
