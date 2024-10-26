function draw_map(){

  var map = L.map('map').setView([37.7749, -122.4194], 5); // Default to San Francisco

  // Add a tile layer (you can change to other providers if needed)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var routeCoordinates = [];
  i = 0;

  // Generate the point sof interest from the trip GPS info
  d3.csv("data/trip_timeline.csv", function(err, data) {
    data.forEach(function(d) {
      if (d.type == "Visit"){
        var marker = L.marker([d.latitude, d.longitude]).addTo(map);
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

  // Generate the points of interest from trip images
  d3.csv("data/trip_imageinfo.csv", function(err, img_data) {
    img_data.forEach(function(d) {
      var marker = L.marker([d.latitude, d.longitude]).addTo(map); 
      // marker.attr('class','image_marker');
    });
  });

  map.fitBounds(L.latLngBounds([44.24, -124.67],[30.33, -102.70]));
  map.setMaxBounds(map.getBounds());

}