// if('serviceWorker' in navigator) {
//     navigator.serviceWorker .register('/sw.js')
//     .then(function() { console.log("Service Worker Registered"); });
// } 



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
    iconUrl: './leaflet/images/done.png',
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
// var ign = new L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
//     subdomains : ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
//     attribution: '&copy; <a href="http://basemap.at">Basemap.at</a>, <a href="http://www.isticktoit.net">isticktoit.net</a>'
// });

//var ign = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
//	attribution: '',
//	subdomains: 'abcd',
//	minZoom: 18,
//	maxZoom: 18,
//	ext: 'png'
//});

var ign = L.tileLayer('https://maps{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.{format}', {
	maxZoom: 18,
	attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
	subdomains: ["", "1", "2", "3", "4"],
	format: 'jpeg',
	//bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
});



mymap.addLayer(ign);

var marker = L.marker([47.583837, 12.171941], { icon: openIcon }).bindPopup("Do you know the wae?").addTo(mymap); //geolocation
var markerTwo = L.marker([47.583435, 12.172601], { icon: openIcon }).bindPopup("Do you know the wae?").addTo(mymap); //geolocation
var markerThree = L.marker([47.583674, 12.173288], { icon: openIcon }).bindPopup("Do you know the wae?").addTo(mymap); //geolocation
var markerFour = L.marker([47.584177, 12.172596], {icon: openIcon}).bindPopup("Do you know the wae?").addTo(mymap); //geolocation
var markerFive = L.marker([47.584260, 12.171722], {icon: openIcon}).bindPopup("Do you know the wae?").addTo(mymap); //geolocation

var currentPositionMarks;
var allMarkers = [marker, markerTwo, markerThree, markerFour, markerFive];


if (!navigator.geolocation) {
    alert("no geolocation for you");
} else {
    function success(position) {
        var here = L.latlng(position.coords.latitude, position.coords.longitude);
        if (currentPositionMarks === undefined) {
            currentPositionMarks = new L.marker(here).bindPopup("here is the way").addto(mymap);
        } else {
            currentPositionMarks.setLatLng(here);
        }

        if (here.distanceTo(marker) < 15.0) {
            marker.setIcon(done);
        }

        if (here.distanceTo(markerTwo) < 15.0) {
            marker.setIcon(done);
        }

        if (here.distanceTo(markerThree) < 15.0) {
            marker.setIcon(done);
        }

        if (here.distanceTo(markerFour) < 15.0) {
            marker.setIcon(done);
        }

        if (here.distanceTo(markerFive) < 15.0) {
            marker.setIcon(done);
        }
    }

    function error(e) {
        switch (e.code) {
            case e.PERMISSION_DENIED:
                console.log("Error: Permission denied");
                break;
            case e.POSITION_UNAVAILABLE:
                console.log("Error: Position unavailable");
                break;
            case e.TIMEOUT:
                console.log("Error: Timeout")
                break;
        }
    }

    var geo_optioins = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 2000,
        distanceFilter: 1
    };

    navWatch = navigator.geolocation.watchPosition(success, error, geo_options);
    

}


 // wrap map.locate in a function    
 function locate() {
    mymap.locate({setView: true, maxZoom: 18});
 }

 // call locate every 3 seconds... forever
 setInterval(locate, 3000);