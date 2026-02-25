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
  // modal e imagen ampliada (se utilizan dentro de updateMainImage)
  const modalImagen = document.getElementById('modalImagen');
  const imagenAmpliada = document.getElementById('imagenAmpliada');

  // Manejo de galería de imágenes
  let currentImageIndex = 0;
  const updateMainImage = (index) => {
    currentImageIndex = index;
    img.src = vitrina.images[index];
    img.alt = `${vitrina.nombre} ${index + 1}`;
    // si el modal está abierto también actualizamos la imagen ampliada
    if (modalImagen.classList.contains('activo')) {
      imagenAmpliada.src = img.src;
      imagenAmpliada.alt = img.alt;
    }
    // marcar miniatura activa
    document.querySelectorAll('#galleryThumbnails .thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  };

  // inicializar con la primera imagen
  updateMainImage(0);

  const lista = document.getElementById('especificaciones');

  vitrina.especificaciones.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    lista.appendChild(li);
  });

  // construir miniaturas si hay más de una imagen
  const thumbnails = document.getElementById('galleryThumbnails');
  if (vitrina.images && vitrina.images.length > 1) {
    vitrina.images.forEach((src, index) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.alt = `${vitrina.nombre} ${index + 1}`;
      thumb.classList.add('thumb');
      thumb.addEventListener('click', () => updateMainImage(index));
      thumbnails.appendChild(thumb);
    });
    // añadir control de navegación
    const btnPrev = document.getElementById('prevImage');
    const btnNext = document.getElementById('nextImage');
    btnPrev.addEventListener('click', () => {
      const newIndex = (currentImageIndex - 1 + vitrina.images.length) % vitrina.images.length;
      updateMainImage(newIndex);
    });
    btnNext.addEventListener('click', () => {
      const newIndex = (currentImageIndex + 1) % vitrina.images.length;
      updateMainImage(newIndex);
    });

    // marcar primera miniatura como activa
    updateMainImage(0);
  } else {
    // si solo hay una imagen, ocultamos los botones de navegación y miniaturas
    document.getElementById('prevImage').style.display = 'none';
    document.getElementById('nextImage').style.display = 'none';
    thumbnails.style.display = 'none';
  }

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
  const btnCerrarModal = document.getElementById('btnCerrarModal');

  // Abrir modal al hacer clic en la imagen
  img.addEventListener('click', () => {
    imagenAmpliada.src = img.src;
    imagenAmpliada.alt = img.alt;
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
 