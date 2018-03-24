function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Die Latitude ist ' + latitude + '° <br>Die Longitude ist ' + longitude + '°</p>';

      var img = new Image();
      img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      output.appendChild(img);
    };

    function error() {
      output.innerHTML = "Es war nicht möglich Sie zu lokalisieren";
    };

    output.innerHTML = "<p>Lokalisieren…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }