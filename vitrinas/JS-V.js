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
      const mensaje = `Hola, quisiera cotizar por la vitrina: ${nombreVitrina}`;
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsApp = `https://wa.me/+50663777773?text=${mensajeCodificado}`;
      window.open(urlWhatsApp, '_blank');
    });
  }
});
 