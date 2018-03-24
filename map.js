var mymap = L.map('mapid').setView([47.583807, 12.1736679], 18); 
//var map = L.map('map').setView([45.8167, 15.9833], 10);

/*start lock map */
mymap.dragging.disable();
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();
mymap.boxZoom.disable();
mymap.keyboard.disable();
if (mymap.tap) mymap.tap.disable();
document.getElementById('mapid').style.cursor = 'default';


/*end lock map */


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo( mymap );
var marker = L.marker([47.583807, 12.1736679]).bindPopup("test").addTo(mymap); //geolocation

map.locate({setView: true, minZoom: 18, maxZoom: 18});


function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);