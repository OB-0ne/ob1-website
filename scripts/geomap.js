
function draw_map(){

  var map = L.map('map').setView([37.7749, -122.4194], 5); // Default to San Francisco

  var imageMarker = new L.icon({
    iconUrl: 'icons/map/image-marker.png',
    iconSize: [75,75]
  });

  var poiMarker = new L.icon({
    iconUrl: 'icons/map/poi-marker.png',
    iconSize: [75,75]
  });

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
        // var marker = L.marker([d.latitude, d.longitude], {icon: poiMarker, title: d.description}).addTo(map);
        // marker.bindTooltip(d.description);
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
      var marker = L.marker([d.latitude, d.longitude], {icon: imageMarker, class: 'abc'}).addTo(map); 
      const popupContent = `
          <div>
            <img src="${"data/image_content/trip/" + d.filename}" class="geomap_marker_trip_image" />
          </div>
        `;
        marker.bindPopup(popupContent);
    });
  });

  map.fitBounds(L.latLngBounds([44.24, -124.67],[30.33, -102.70]));
  map.setMaxBounds(map.getBounds());

}