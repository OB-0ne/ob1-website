// Define layers for assigning shapes
var layer_quests, layer_quests_completed, layer_shipBeacon;
var map;
var userIsPhone = false;

function draw_map(){

  let custom_map_height = window.innerHeight - 115;
  // add a check to see if user is on mobile and set a different map height accordingly
  if (window.innerWidth<=768){
    custom_map_height = custom_map_height - 60;
    userIsPhone = true;
  }
  document.getElementById('map').setAttribute("style","height:"+(custom_map_height)+"px");

  // Add a tile layer (you can change to other providers if needed)
  var def_Map = L.tileLayer('https://{s}.tile. .org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    zoomSnap: 0.1,
  });

  // make layer grousp for the markers - visist and images
  layer_quests = L.featureGroup();
  layer_quests_completed = L.featureGroup();
  layer_shipBeacon = L.featureGroup();

  // create dictionaries for baseMaps - in this case only the default map
  // this is a neede variable while making a layer control
  var baseMaps = {
    "Deafult Map": def_Map
  }
  // create a dictionary for different overlays - these will appear as checkbox
  var overlays = {
    "Active Quests": layer_quests,
    "Completed Quests": layer_quests_completed,
    "Ship Beacons": layer_shipBeacon
  };

  // initiate the map and select default map tile and selected checkboxes
  map = L.map('map',{
    layers: [def_Map, layer_quests, layer_quests_completed, layer_shipBeacon]
  });

  // initialize the control which can be interacted with
  var layerControl = L.control.layers(baseMaps,overlays).addTo(map);

  var baseMapOverlay_width = 202;
  var baseMapOverlay_height = 92;
  var latLngMapImage = L.latLngBounds([[-(baseMapOverlay_height/2),-(baseMapOverlay_width/2)],[baseMapOverlay_height/2,baseMapOverlay_width/2]]);
  var baseMapOverlay = L.imageOverlay("data/map_img/gia_map_270_01.png", latLngMapImage, {
    opacity: 0.8,
    interactive: true
  }).addTo(map);

  map.fitBounds(latLngMapImage);

  // setup first province map for Yearndale
  // var yearndale_center = [-17.9787, 3.8672];
  var yearndale_center = [4.66, -18.27];
  // var yearndale_center = [-2.74, -26.19];
  var layerScale = 3;
  latLngMapImage = L.latLngBounds([[yearndale_center[1]-7.18/layerScale, yearndale_center[0]-10.2/layerScale], [yearndale_center[1]+7.18/layerScale, yearndale_center[0]+10.2/layerScale]]);  
  imageOverlay = L.imageOverlay("data/map_img/yearndale_valley.jpg", latLngMapImage, {
    opacity: 0.8,
    interactive: true
  }).addTo(map);
  map.fitBounds(latLngMapImage);

}

function setup_map(){

  draw_ship_beacons();
  draw_yearndale_quests();

}

// Make the markers for the 12 ships
function draw_ship_beacons(){

  url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAGelOOBFom8pECNkzGeTQC8yCZzmTToAnc2uEaAcDmk_YkcIbI6LTLWy0J6_1TVtHLLpJ923r2KEc/pub?gid=64832681&single=true&output=csv";

  d3.csv(url, d3.autotype, function(data){
    data.forEach(d => {
      L.circle([d.lat, d.long], {radius: 30000, color: d.circle_color}).addTo(layer_shipBeacon); 
    });   
  });
  
}

function draw_yearndale_quests(){
  var marker_quest;
  var questIcon = L.icon({
    iconUrl: 'icons/map/poi-marker.png',
    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    tooltipAnchor:[10, -25]
  });
  var questIcon_completed = L.icon({
    iconUrl: 'icons/map/poi-marker-complete.png',
    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    tooltipAnchor:[10, -25]
  });

  url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkliXzriYwLF4xOxZ_2l-fT5PeGdy6-CLPprazhOr9-2WRw6w6YScusTq_vUhKAnPIFWgUJKdwmxwN/pub?gid=340077082&single=true&output=csv";

  d3.csv(url,function(data) {
    data.forEach(d => {
      if(d.status.toLowerCase() == "completed"){
        marker_quest = L.marker([d.lat, d.long], {icon: questIcon_completed, title: d.name}).addTo(layer_quests_completed);
      }
      else {
        marker_quest = L.marker([d.lat, d.long], {icon: questIcon, title: d.name}).addTo(layer_quests);
      }
      
      marker_quest.bindTooltip(d.name);
    });    
  });
}

// Toggle popup visibility
function toggleGeomapInfoPopup() {
  const infoPopup = document.getElementById('info-popup');
  infoPopup.classList.toggle('hidden');
  document.getElementById('info-popup-byDate').classList.toggle('hidden');

}

// Show popup on page load
window.onload = function() {
  document.getElementById('info-popup').classList.remove('hidden');
  L.DomEvent.disableScrollPropagation(document.getElementById('info-popup-byDate'));
  L.DomEvent.disableClickPropagation(document.getElementById('info-popup-byDate'));

  map.on('zoomend', function() {
    if (map.getZoom() < 6) {
      map.removeLayer(layer_quests);
      map.removeLayer(layer_quests_completed);
    } else {
      map.addLayer(layer_quests);
      map.addLayer(layer_quests_completed);
    }
  });

  // DEBUG MODE

  document.getElementById('info-popup-byDate').style.setProperty('display', 'none', 'important');
  document.getElementById('info-popup').classList.add('hidden');

  map.on('click', function(e){
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log("Lat/Long: " + Math.round(lat*1000)/1000 + ", " + Math.round(lng*1000)/1000);
  });
};