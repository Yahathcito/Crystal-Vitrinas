document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const vitrina = VITRINAS[id];

  if (!vitrina) {
    document.body.innerHTML = "<p>Vitrina no encontrada</p>";
    return;
  }

  document.getElementById('titulo').textContent = vitrina.nombre;
  document.getElementById('descripcion').textContent = vitrina.descripcion;

  const img = document.getElementById('imagenVitrina');
  img.src = vitrina.imagen;
  img.alt = vitrina.nombre;

  const lista = document.getElementById('especificaciones');

  vitrina.especificaciones.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    lista.appendChild(li);
  });

  // Agregar mensaje predeterminado al botón de WhatsApp
  const botonWhatsApp = document.querySelector('.detalle-cta a');
  if (botonWhatsApp) {
    botonWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const nombreVitrina = vitrina.nombre;
const mensaje = `¡Hola!
Me gustaría cotizar la siguiente vitrina:
${nombreVitrina}

Quedo atento, ¡gracias!`;
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsApp = `https://wa.me/+50663777773?text=${mensajeCodificado}`;
      window.open(urlWhatsApp, '_blank');
    });
  }

  // ========================
  // FUNCIONALIDAD MODAL IMAGEN
  // ========================
  const modalImagen = document.getElementById('modalImagen');
  const imagenVitrina = document.getElementById('imagenVitrina');
  const imagenAmpliada = document.getElementById('imagenAmpliada');
  const btnCerrarModal = document.getElementById('btnCerrarModal');

  // Abrir modal al hacer clic en la imagen
  imagenVitrina.addEventListener('click', () => {
    imagenAmpliada.src = imagenVitrina.src;
    imagenAmpliada.alt = imagenVitrina.alt;
    modalImagen.classList.add('activo');
    document.body.style.overflow = 'hidden'; // Evitar scroll del body
  });

  // Cerrar modal al hacer clic en la X
  btnCerrarModal.addEventListener('click', () => {
    modalImagen.classList.remove('activo');
    document.body.style.overflow = 'auto'; // Restaurar scroll
  });

  // Cerrar modal al hacer clic fuera de la imagen
  modalImagen.addEventListener('click', (e) => {
    if (e.target === modalImagen) {
      modalImagen.classList.remove('activo');
      document.body.style.overflow = 'auto'; // Restaurar scroll
    }
  });

  // Cerrar modal con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalImagen.classList.contains('activo')) {
      modalImagen.classList.remove('activo');
      document.body.style.overflow = 'auto'; // Restaurar scroll
    }
  });
});
 