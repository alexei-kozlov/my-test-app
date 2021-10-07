function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 48.8543488, lng: 37.7037835},
  });
  directionsRenderer.setMap(map);
  document.getElementById('submit').addEventListener('click', () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
      {
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const summaryPanel = document.getElementById('directions-panel');
          summaryPanel.innerHTML = '';
          // summaryPanel.style.textAlign = 'center';

          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
                '<b>Route Segment: ' + routeSegment + '</b><br><ins>FROM:</ins> ';
            summaryPanel.innerHTML += route.legs[i].start_address + '<br><ins>TO:</ins> ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br><ins>DISTANCE:</ins> ';
            summaryPanel.innerHTML += route.legs[i].distance.text;
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
  );
}