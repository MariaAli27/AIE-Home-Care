document.addEventListener("DOMContentLoaded", function () {

    fetch("assets/datos/galeria.json")
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No se pudo cargar la galería.");
            }

            return respuesta.json();
        })
        .then(function (galeria) {

            const contenedor =
                document.getElementById("contenedorGaleria");

            contenedor.innerHTML = "";

            galeria.forEach(function (elemento) {

                contenedor.innerHTML += `
                    <div class="col-md-6 col-lg-4 mb-4">

                        <div class="tarjeta-galeria">

                            <img
                                src="${elemento.imagen}"
                                alt="${elemento.titulo}"
                            >

                            <div class="galeria-info">

                                <h3>${elemento.titulo}</h3>

                                <p>${elemento.descripcion}</p>

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