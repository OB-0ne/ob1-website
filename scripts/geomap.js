function draw_map(){

    var map = L.map('map').setView([37.7749, -122.4194], 5); // Default to San Francisco
  
    // Add a tile layer (you can change to other providers if needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([34.0522, -118.2437]).addTo(map); // Los Angeles
    marker.bindPopup("<b>Los Angeles</b><br>Had an amazing time here!");

    // var marker = L.marker([36.1699, -115.1398]).addTo(map); // Las Vegas
    // marker.bindPopup("<b>Las Vegas</b><br><img src='https://media.nomadicmatt.com/2023/vegasthings1.jpeg' width='100' alt='Vegas'><br>This was an awesome stop!").openPopup();

    var routeCoordinates = [
        [37.7749, -122.4194], // San Francisco
        [36.1699, -115.1398], // Las Vegas
        [34.0522, -118.2437], // Los Angeles
        [40.7128, -74.0060]   // New York
    ];

    // Create a polyline and add it to the map
    // var route = L.polyline(routeCoordinates, {
    //     color: 'red',
    //     weight: 4,       // Line thickness
    //     opacity: 0.7,    // Line transparency
    //     dashArray: '10, 10' // Makes the line dashed (optional)
    //   }).addTo(map);

    var route = L.Routing.control({
        waypoints: routeCoordinates,
        routeWhileDragging: true,
        show: false,
        lineOptions: {
          styles: [{ color: 'blue', weight: 5, opacity: 0.7 }] // Customize route style
        }        
      }).addTo(map);
      route.hide();

    // Zoom the map to fit the route
    // map.fitBounds(route.getBounds());

}