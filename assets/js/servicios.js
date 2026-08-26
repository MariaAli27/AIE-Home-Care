document.addEventListener("DOMContentLoaded", function () {

    fetch("assets/datos/servicios.json")
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("Error cargando servicios.");
            }

            return respuesta.json();
        })
        .then(function (servicios) {

            const contenedor =
                document.getElementById("contenedorTodosServicios");

            contenedor.innerHTML = "";

            servicios.forEach(function (servicio) {

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

                                <a
                                    href="cotizacion.html"
                                    class="btn btn-principal"
                                >
                                    Cotizar
                                </a>

                            </div>

                        </div>

                    </div>
                `;
            });

        })
        .catch(function (error) {
            console.error(error);
        });

});