/*=============== Track Location ===============*/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    const myLatitude = position.coords.latitude;
    const myLongitude = position.coords.longitude;

    // const myLocation = document.getElementById('my-location');
    // const iframeLocation = document.createElement('iframe');

    // iframeLocation.setAttribute("src", `https://www.google.com/maps?q=${myLatitude},${myLongitude}&hs=es;z=14&output=embed`);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        alert("You must allow the request for Geolocation to fill out the form");
        location.reload();
        break;
    }
}