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
      else if (d.type = "Moving"){
        if (i > 100 && i < 110){
          var temp = [];
          temp.push(parseFloat(d.latitude));
          temp.push(parseFloat(d.longitude));
          routeCoordinates.push(temp);
        } 
        i = i + 1;
      }        
    });
    // console.log(routeCoordinates);
    // var route = L.Routing.control({
    //   waypoints: routeCoordinates,
    //   routeWhileDragging: true,
    //   show: false,
    //   lineOptions: {
    //     styles: [{ color: 'blue', weight: 5, opacity: 0.7 }] // Customize route style
    //   },
    //   createMarker: function() { return null; }
    // }).addTo(map);

  });

  

  // var marker = L.marker([34.0522, -118.2437]).addTo(map); // Los Angeles
  // marker.bindPopup("<b>Los Angeles</b><br>Had an amazing time here!");

  // var marker = L.marker([36.1699, -115.1398]).addTo(map); // Las Vegas
  // marker.bindPopup("<b>Las Vegas</b><br><img src='https://media.nomadicmatt.com/2023/vegasthings1.jpeg' width='100' alt='Vegas'><br>This was an awesome stop!").openPopup();

  var routeCoordinates = [
      [37.7749, -122.4194], // San Francisco
      [36.1699, -115.1398], // Las Vegas
      [34.0522, -118.2437], // Los Angeles
      [38.580786, -107.717514]
  ];

  var route = L.Routing.control({
    waypoints: routeCoordinates,
    routeWhileDragging: true,
    show: false,
    lineOptions: {
      styles: [{ color: 'blue', weight: 5, opacity: 0.7 }] // Customize route style
    },
    createMarker: function() { return null; }
  }).addTo(map);
    route.hide();

  // Zoom the map to fit the route
  // map.fitBounds(route.getBounds());

}