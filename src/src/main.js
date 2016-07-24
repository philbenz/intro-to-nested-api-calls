//dom manipulation - needs to be done in the IFFE
$(document).ready(function() {
  //sanity check
  console.log('sanity check: intro to nested APIs with IP');

  //this prevents the post request to get sent to the server.  Instead - this hijacks that effort in order for form validation.
  $('#getIP').on('click', function(event) {

    event.preventDefault();
    console.log('sanity check for IP info');


    //this function is being used to populate the mapProp object for the map.
    function initialize(location) {

      //split location into two doubles to use good API call
      var latlng = location.split(',');

      var mapProp = {
          center:new google.maps.LatLng(latlng[0], latlng[1]),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      return mapProp;
    }

    $.ajax({
      method: 'GET',
      url: 'https://api.ipify.org'
    }).done(function(results) {
      // pulled this directly from a google response search to pull the location.
      $.get('http://ipinfo.io', function(response) { console.log(response.loc);

      }, 'jsonp').done(function(response) {
        //set the divs in ipify

        $(".row_ipIfy").append("<div class='panel panel-default'>");  $(".row_ipIfy").append('<div class="panel-heading">ipIfy Results</div>');
        $(".row_ipIfy").append('<div class="panel-body">' + results + '</div>');
        $(".row_ipIfy").append('</div>');

        $(".row_ipInfo").append("<div class='panel panel-default'>");  $(".row_ipInfo").append('<div class="panel-heading">ipInfo Results</div>');
        $(".row_ipInfo").append('<div class="panel-body">' + response.city + ', ' + response.region + '</div>');
        $('.row_Ipnfo').append('</div>');

        //build out the mapInfo object with the ipinfo result.
        var mapInfo = initialize(response.loc);

        //set the map in index.html
        var map = new google.maps.Map(document.getElementById('googleMap'), mapInfo);

      });
    });
  });
});
