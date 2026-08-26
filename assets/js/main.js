document.addEventListener("DOMContentLoaded", function () {
    cargarServiciosHome();
    cargarGaleriaHome();
    cargarClima();
});

function cargarServiciosHome() {

    fetch("assets/datos/servicios.json")
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No se pudieron cargar los servicios.");
            }

            return respuesta.json();
        })
        .then(function (servicios) {

            const contenedor = document.getElementById("contenedorServicios");

            if (!contenedor) {
                return;
            }

            contenedor.innerHTML = "";

            servicios.slice(0, 3).forEach(function (servicio) {

                contenedor.innerHTML += `
                    <div class="col-md-6 col-lg-4 mb-4">

                        <div class="tarjeta-servicio">

                            <img
                                src="${servicio.imagen}"
                                alt="${servicio.nombre}"
                            >

                            <div class="contenido-servicio">

                                <div class="icono-servicio">
                                    <i class="bi ${servicio.icono}"></i>
                                </div>

                                <h3>${servicio.nombre}</h3>

                                <p>${servicio.descripcion}</p>

                            </div>

                        </div>

                    </div>
                `;
            });

        })
        .catch(function (error) {
            console.error(error);
        });
}


function cargarGaleriaHome() {

    fetch("assets/datos/galeria.json")
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No se pudo cargar la galería.");
            }

            return respuesta.json();
        })
        .then(function (galeria) {

            const contenedor = document.getElementById("contenedorGaleriaHome");

            if (!contenedor) {
                return;
            }

            contenedor.innerHTML = "";

            galeria.slice(0, 4).forEach(function (elemento) {

                contenedor.innerHTML += `
                    <div class="col-6 col-lg-3">
                        <img
                            src="${elemento.imagen}"
                            class="imagen-galeria"
                            alt="${elemento.titulo}"
                        >
                    </div>
                `;
            });

        })
        .catch(function (error) {
            console.error(error);
        });
}




function cargarClima() {

    const temperatura = document.getElementById("temperaturaActual");

    if (!temperatura) {
        return;
    }

    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=9.93&longitude=-84.08&current=temperature_2m,weather_code&timezone=America%2FCosta_Rica";

    fetch(url)
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No fue posible consultar el clima.");
            }

            return respuesta.json();
        })
        .then(function (datos) {

            temperatura.textContent =
                datos.current.temperature_2m + " °C";

            document.getElementById("estadoClima").textContent =
                obtenerDescripcionClima(datos.current.weather_code);
        })
        .catch(function () {

            temperatura.textContent = "No disponible";

            document.getElementById("estadoClima").textContent =
                "No fue posible consultar el clima.";
        });
}


function obtenerDescripcionClima(codigo) {

    if (codigo === 0) {
        return "Despejado";
    }

    if (codigo === 1 || codigo === 2 || codigo === 3) {
        return "Parcialmente nublado";
    }

    if (codigo >= 51 && codigo <= 67) {
        return "Lluvia";
    }

    if (codigo >= 80) {
        return "Posibilidad de lluvia";
    }

    return "Condición variable";
}



$(document).ready(function () {

    $("#btnMostrarConsejos").click(function () {

        $("#consejosLimpieza").slideToggle();

    });

});