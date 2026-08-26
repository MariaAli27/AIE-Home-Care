document.addEventListener("DOMContentLoaded", function () {

    console.log("contacto.js cargó correctamente");

    const fechaNacimiento =
        document.getElementById("fechaNacimiento");

    const ingreso =
        document.getElementById("ingreso");

    const presupuesto =
        document.getElementById("presupuesto");

    const formulario =
        document.getElementById("formContacto");


    if (!formulario) {
        console.error("ERROR: No se encontró formContacto");
        return;
    }


    fechaNacimiento.addEventListener(
        "change",
        calcularEdad
    );


    ingreso.addEventListener("input", function () {

        document.getElementById("valorIngreso").textContent =
            "₡" +
            Number(ingreso.value).toLocaleString("es-CR");

    });


    presupuesto.addEventListener("input", function () {

        document.getElementById("valorPresupuesto").textContent =
            "₡" +
            Number(presupuesto.value).toLocaleString("es-CR");

    });


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        console.log("Formulario enviado");

        enviarFormulario();

    });

});


function calcularEdad() {

    const fecha =
        document.getElementById("fechaNacimiento").value;


    if (fecha === "") {
        return;
    }


    const nacimiento =
        new Date(fecha + "T00:00:00");

    const hoy =
        new Date();


    let edad =
        hoy.getFullYear() -
        nacimiento.getFullYear();


    const mes =
        hoy.getMonth() -
        nacimiento.getMonth();


    if (
        mes < 0 ||
        (
            mes === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {

        edad--;

    }


    document.getElementById("edad").value =
        edad;


    document.getElementById("mostrarEdad").textContent =
        "Edad calculada: " +
        edad +
        " años";

}


function enviarFormulario() {

    console.log("Entró a enviarFormulario()");


    const nombre =
        document.getElementById("nombreCompleto").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const telefono =
        document.getElementById("telefono").value.trim();

    const fecha =
        document.getElementById("fechaNacimiento").value;

    const genero =
        document.querySelector(
            'input[name="genero"]:checked'
        );

    const grados =
        document.querySelectorAll(
            'input[name="gradoAcademico"]:checked'
        );

    const servicio =
        document.getElementById("tipoServicio").value;

    const mensaje =
        document.getElementById("mensaje").value.trim();

    const formulario =
        document.getElementById("formContacto");

    const boton =
        document.getElementById("btnEnviar");


    if (nombre.length < 5) {

        alert("Ingrese su nombre completo.");
        return;

    }


    if (correo === "") {

        alert("Ingrese su correo electrónico.");
        return;

    }


    if (telefono === "") {

        alert("Ingrese su número de teléfono.");
        return;

    }


    if (fecha === "") {

        alert("Seleccione su fecha de nacimiento.");
        return;

    }


    if (!genero) {

        alert("Seleccione un género.");
        return;

    }


    if (grados.length === 0) {

        alert(
            "Seleccione al menos un grado académico."
        );

        return;

    }


    if (servicio === "") {

        alert(
            "Seleccione el servicio de interés."
        );

        return;

    }


    if (mensaje.length < 10) {

        alert(
            "Escriba un mensaje más detallado."
        );

        return;

    }


    calcularEdad();


    console.log("Validaciones correctas");

    console.log(
        "EmailJS disponible:",
        typeof emailjs
    );

    console.log(
        "Service ID:",
        "service_qik6tag"
    );

    console.log(
        "Template ID:",
        "template_lebiod9"
    );


    boton.disabled = true;

    boton.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>' +
        'Enviando...';


    console.log("Intentando enviar correo con EmailJS...");


    emailjs.sendForm(
        "service_qik6tag",
        "template_lebiod9",
        formulario
    )

    .then(function (respuesta) {

        console.log(
            "EMAIL ENVIADO CORRECTAMENTE"
        );

        console.log(respuesta);


        document.getElementById(
            "mensajeConfirmacion"
        ).textContent =
            "Gracias " +
            nombre +
            " por contactar a AIE Home Care. " +
            "Hemos recibido tu solicitud y nos pondremos " +
            "en contacto contigo pronto.";


        const modal =
            new bootstrap.Modal(
                document.getElementById(
                    "modalConfirmacion"
                )
            );


        modal.show();


        formulario.reset();


        document.getElementById(
            "mostrarEdad"
        ).textContent = "";


        document.getElementById(
            "edad"
        ).value = "";


        document.getElementById(
            "valorIngreso"
        ).textContent =
            "₡500,000";


        document.getElementById(
            "valorPresupuesto"
        ).textContent =
            "₡50,000";


        boton.disabled = false;


        boton.innerHTML =
            '<i class="bi bi-send-fill"></i> Enviar información';

    })

    .catch(function (error) {

        console.error(
            "ERROR DE EMAILJS:"
        );

        console.error(error);


        let mensajeError =
            "Ocurrió un error desconocido.";


        if (error.text) {

            mensajeError =
                error.text;

        } else if (error.message) {

            mensajeError =
                error.message;

        } else {

            mensajeError =
                JSON.stringify(error);

        }


        alert(
            "ERROR AL ENVIAR EL CORREO:\n\n" +
            mensajeError
        );


        boton.disabled = false;


        boton.innerHTML =
            '<i class="bi bi-send-fill"></i> Enviar información';

    });

}