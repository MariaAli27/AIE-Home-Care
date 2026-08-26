document.addEventListener("DOMContentLoaded", function () {

    cargarServicios();

    const formulario =
        document.getElementById("formCotizacion");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        calcularCotizacion();
    });

});


function cargarServicios() {

    fetch("assets/datos/servicios.json")

        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No se pudieron cargar los servicios.");
            }

            return respuesta.json();

        })

        .then(function (servicios) {

            const select =
                document.getElementById("servicio");

            servicios.forEach(function (servicio) {

                const opcion =
                    document.createElement("option");

                opcion.value = servicio.id;
                opcion.textContent = servicio.nombre;

                select.appendChild(opcion);

            });

        })

        .catch(function (error) {

            console.error(
                "Error cargando servicios:",
                error
            );

        });
}


function calcularCotizacion() {

    const nombre =
        document
            .getElementById("nombreCotizacion")
            .value
            .trim();

    const servicio =
        document.getElementById("servicio").value;

    const habitaciones =
        Number(
            document.getElementById("habitaciones").value
        );

    const banos =
        Number(
            document.getElementById("banos").value
        );

    const dias =
        Number(
            document.getElementById("dias").value
        );


    if (
        nombre === "" ||
        servicio === "" ||
        habitaciones <= 0 ||
        banos <= 0 ||
        dias <= 0
    ) {

        alert(
            "Complete todos los campos correctamente."
        );

        return;
    }


    let baseMateriales = 20000;


    // Limpieza general
    if (servicio === "1") {

        baseMateriales = 20000;

    }


    // Limpieza profunda
    if (servicio === "2") {

        baseMateriales = 35000;

    }


    // Mantenimiento de jardines
    if (servicio === "3") {

        baseMateriales = 25000;

    }


    // Arreglos habitacionales
    if (servicio === "4") {

        baseMateriales = 40000;

    }


    // Remodelaciones
    if (servicio === "5") {

        baseMateriales = 45000;

    }


    const adicionalHabitaciones =
        habitaciones * 4000;

    const adicionalBanos =
        banos * 3000;


    const costoMateriales =
        baseMateriales +
        adicionalHabitaciones +
        adicionalBanos;


    const totalEspacios =
        habitaciones + banos;


    let cantidadPersonas;


    if (totalEspacios <= 4) {

        cantidadPersonas = 4;

    } else if (totalEspacios <= 6) {

        cantidadPersonas = 5;

    } else if (totalEspacios <= 8) {

        cantidadPersonas = 6;

    } else if (totalEspacios <= 10) {

        cantidadPersonas = 7;

    } else {

        cantidadPersonas =
            7 +
            Math.ceil(
                (totalEspacios - 10) / 2
            );

    }


    const costoPersonaDia = 20000;


    const manoObra =
        cantidadPersonas *
        costoPersonaDia *
        dias;


    const subtotal =
        costoMateriales +
        manoObra;


    const porcentajeGanancia = 20;


    const ganancia =
        subtotal *
        (porcentajeGanancia / 100);


    const total =
        subtotal +
        ganancia;


    const resultado =
        document.getElementById(
            "resultadoCotizacion"
        );


    resultado.style.display =
        "block";


    resultado.innerHTML = `

        <h3>
            Estimación de cotización
        </h3>

        <p>
            Cliente:
            <strong>
                ${nombre}
            </strong>
        </p>

        <hr>

        <p>
            Días solicitados:
            <strong>
                ${dias}
            </strong>
        </p>

        <p>
            Personal estimado:
            <strong>
                ${cantidadPersonas} trabajadores
            </strong>
        </p>

        <p>
            Costo por trabajador por día:
            <strong>
                ₡${costoPersonaDia.toLocaleString("es-CR")}
            </strong>
        </p>

        <p>
            Mano de obra:
            <strong>
                ₡${manoObra.toLocaleString("es-CR")}
            </strong>
        </p>

        <p>
            Materiales estimados:
            <strong>
                ₡${costoMateriales.toLocaleString("es-CR")}
            </strong>
        </p>

        <p>
            Subtotal:
            <strong>
                ₡${subtotal.toLocaleString("es-CR")}
            </strong>
        </p>

        <p>
            Margen de ganancia
            (${porcentajeGanancia}%):

            <strong>
                ₡${Math.round(ganancia).toLocaleString("es-CR")}
            </strong>
        </p>

        <hr>

        <h4>
            Monto estimado:

            <strong>
                ₡${Math.round(total).toLocaleString("es-CR")}
            </strong>

        </h4>

        <p class="mt-3">

            Este monto es una estimación y puede variar
            según las condiciones de la vivienda,
            los materiales requeridos y las características
            específicas del trabajo.

        </p>

    `;
}