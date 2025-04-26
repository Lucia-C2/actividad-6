(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    const perfilesContainer = document.getElementById('perfiles'); // Donde se mostrarán los perfiles
  
    // Array para almacenar los datos enviados
    const datosEnviados = [];
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }
  
        // Recopilar los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;
        const foto = document.getElementById('foto').files[0]; // Obtener la foto seleccionada
  
        // Validar si el usuario seleccionó una foto
        if (!foto) {
          return alert("Por favor selecciona una foto.");
        }
  
        // Crear un objeto de imagen y leer la foto seleccionada
        const reader = new FileReader();
        reader.onloadend = function () {
          const fotoUrl = reader.result; // URL de la foto cargada
  
          // Guardar los datos en el array
          datosEnviados.push({ nombre, correo, mensaje, fotoUrl });
  
          // Mostrar los datos en la página como perfil
          mostrarPerfil(nombre, correo, mensaje, fotoUrl);
  
          // Restablecer el formulario y la validación
          form.reset();
          form.classList.remove('was-validated');
  
          // Mostrar mensaje de éxito
          const messageStatus = document.getElementById('message-status');
          messageStatus.innerHTML = `<div class="alert alert-success">Formulario enviado correctamente</div>`;
        };
  
        // Leer la imagen como una URL
        reader.readAsDataURL(foto);
      });
    });
  
    // Función para mostrar un perfil nuevo
    function mostrarPerfil(nombre, correo, mensaje, fotoUrl) {
      // Crear una tarjeta de perfil para el nuevo contacto
      const perfilCard = document.createElement('div');
      perfilCard.classList.add('col-md-4', 'mb-4');
  
      perfilCard.innerHTML = `
        <div class="card text-center shadow">
          <img src="${fotoUrl}"
               class="card-img-top rounded-circle mx-auto mt-3"
               style="width: 150px;" alt="Foto de perfil" />
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Correo: ${correo}</p>
            <p class="card-text">Mensaje: ${mensaje}</p>
          </div>
        </div>
      `;
  
      // Agregar la tarjeta al contenedor de perfiles
      perfilesContainer.appendChild(perfilCard);
    }
  })();
  