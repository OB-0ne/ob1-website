function draw_map(){

  var map = L.map('map').setView([37.7749, -122.4194], 5); // Default to San Francisco

  // Add a tile layer (you can change to other providers if needed)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var routeCoordinates = [];
  i = 0;

  d3.csv("data/trip_timeline.csv", function(err, data) {
    data.forEach(function(d) {
      if (d.type == "Visit"){
        var marker = L.marker([d.latitude, d.longitude]).addTo(map); // Los Angeles
        marker.bindPopup(d.description);
      }
      else {
        var temp = [];
        temp.push(parseFloat(d.latitude));
        temp.push(parseFloat(d.longitude));
        routeCoordinates.push(temp);
      }
    });
    
    L.polyline(routeCoordinates, {color: 'blue'}).addTo(map);
  });

  map.fitBounds(L.latLngBounds([44.24, -124.67],[30.33, -102.70]));
  map.setMaxBounds(map.getBounds());

}