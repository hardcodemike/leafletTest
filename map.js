var mymap = L.map('mapid').setView([47.583807, 12.1736679], 18); 
//var map = L.map('map').setView([45.8167, 15.9833], 10);


var LeafIcon = L.Icon.extend({
    options: {
       iconSize:     [38, 45],
       iconAnchor:   [22, 94],
       popupAnchor:  [-3, -76]
    }
});
var openIcon = new LeafIcon({
    iconUrl: './leaflet/images/knuckles.png',
});

var doneIcon = new LeafIcon({
    iconUrl: './leaflet/images/heart.jpeg',
});

/*start lock map */
mymap.dragging.disable();
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();
mymap.boxZoom.disable();
mymap.keyboard.disable();
if (mymap.tap) mymap.tap.disable();
document.getElementById('mapid').style.cursor = 'default';

mymap.removeControl(mymap.zoomControl);
/*end lock map */


// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(mymap); //auswahl der verschiedenen Maps
var ign = new L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains : ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
    attribution: '&copy; <a href="http://basemap.at">Basemap.at</a>, <a href="http://www.isticktoit.net">isticktoit.net</a>'
});

mymap.addLayer(ign);
// TODO auf basemaps


var marker = L.marker([47.583837, 12.171941], { icon: openIcon }).bindPopup("do u know the wae?").addTo(mymap); //geolocation
var markerTwo = L.marker([47.583435, 12.172601], { icon: openIcon }).bindPopup("do u know the wae?").addTo(mymap); //geolocation
var markerThree = L.marker([47.583674, 12.173288], { icon: openIcon }).bindPopup("do u know the wae?").addTo(mymap); //geolocation
var markerFour = L.marker([47.584177, 12.172596], {icon: openIcon}).bindPopup("do u know the wae?").addTo(mymap); //geolocation
var markerFive = L.marker([47.584260, 12.171722], {icon: openIcon}).bindPopup("do u know the wae?").addTo(mymap); //geolocation


function onLocationFound(e) {
    var radius = e.accuracy / 4;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

mymap.on('locationfound', onLocationFound);
mymap.locate({setView: true, watch: true, minZoom: 18, maxZoom: 18});


function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);