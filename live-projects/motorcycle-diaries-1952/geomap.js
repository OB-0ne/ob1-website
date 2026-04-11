// Define layers for assigning shapes
var visitMark_Layer;
var map;
var userIsPhone = false;

function draw_map(){

  let custom_map_height = window.innerHeight - 150;
  // add a check to see if user is on mobile and set a different map height accordingly
  if (window.innerWidth<=768){
    custom_map_height = custom_map_height - 20;
    userIsPhone = true;
  }
  document.getElementById('map').setAttribute("style","height:"+(custom_map_height)+"px");

  // Add a tile layer (you can change to other providers if needed)
  var def_Map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    zoomSnap: 0.1,
  });

  // make layer grousp for the markers - visist
  visitMark_Layer = L.featureGroup();

  // create dictionaries for baseMaps - in this case only the default map
  // this is a neede variable while making a layer control
  var baseMaps = {
    "Deafult Map": def_Map
  }
  // create a dictionary for different overlays - these will appear as checkbox
  var overlays = {
    "Vists": visitMark_Layer
  };

  // initiate the map and select default map tile and selected checkboxes
  map = L.map('map',{
    layers: [def_Map, visitMark_Layer]
  });

  // initialize the control which can be interacted with
  var layerControl = L.control.layers(baseMaps,overlays).addTo(map);

}

var visits_data;
var temp;
function setup_map(){
  
  if(visits_data){
    
    var prev_visit;
    
    // draw each conflict as a circle
    visits_data.forEach(function(d) {
      if(d.latitude){

        if(prev_visit){
          L.polyline([prev_visit,[d.latitude, d.longitude]], {color: line_col, dashArray: '5, 4'}).addTo(visitMark_Layer);
        }
        var marker = L.circle([d.latitude, d.longitude], 5000,{color: 'red'}).addTo(visitMark_Layer);
        marker.bindTooltip(d.end + ' - ' + d.location);
        
        prev_visit = [d.latitude, d.longitude]
        line_col = 'green'
      } else {
        line_col = 'purple'
      }
    });
    
    // set default settings for the map including bounds, active layers
    buffer = 0
    if (userIsPhone){
      map.fitBounds(L.latLngBounds([25,-48],[-42,-82]));
    } else{
      map.fitBounds(L.latLngBounds([8,-2],[-27,-129]));
    }

  }
  else{
    visitMark_Layer.clearLayers();

    // assign global UI control variables
    d3.csv("data/52che_travel_diary.csv",function(data) {
      visits_data = data
      setup_map();
    });
  }

}


// Toggle popup visibility
function toggleGeomapInfoPopup() {
  const infoPopup = document.getElementById('info-popup');
  infoPopup.classList.toggle('hidden');
}

// Show popup on page load
window.onload = function() {
  document.getElementById('info-popup').classList.remove('hidden');
};