let mapa;
let directionsService;
let directionsRenderer;



const destinoNegocio=
{
    lat: 10.025088,
    lng: -84.185262
};

function iniciarMapa() {

    mapa = new google.maps.Map(
        document.getElementById("mapa"),
        {
            center: destinoNegocio,
            zoom: 14
        }
    );

    new google.maps.Marker({
        position: destinoNegocio,
        map: mapa,
        title: "AIE Home Care"
    });

    directionsService =
        new google.maps.DirectionsService();

    directionsRenderer =
        new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(mapa);
}


function obtenerMiUbicacion() {

    if (!navigator.geolocation) {

        alert(
            "El navegador no permite utilizar geolocalización."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (posicion) {

            const origen = {
                lat: posicion.coords.latitude,
                lng: posicion.coords.longitude
            };

            calcularRuta(origen);

        },

        function () {

            alert(
                "No fue posible obtener su ubicación."
            );

        }
    );
}

function calcularRuta(origen) {

    directionsService.route(
        {
            origin: origen,
            destination: destinoNegocio,
            travelMode: google.maps.TravelMode.DRIVING
        },

        function (resultado, estado) {

            console.log("Estado de la ruta:", estado);
            console.log("Resultado:", resultado);

            if (estado === "OK") {

                directionsRenderer.setDirections(resultado);

            } else {

                alert(
                    "No fue posible calcular la ruta. Error: " + estado
                );

            }
        }
    );
}