window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/a0b488e61c110715151ebd43acbd2a34/${lat},${long}`;

            fetch(api)
                .then(response => {

                    return response.json()
                }).then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Element From the Api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set Icon
                    setIcons(icon, document.querySelector('.icon'));
                    //
                })
                .catch(err => console.log(err))

        });

    }
    function setIcons(icon, iconId) {
        var skycons = new Skycons({ "color": "white" });
        // on Android, a nasty hack is needed: {"resizeClear": true}

        // you can add a canvas by it's ID...
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});