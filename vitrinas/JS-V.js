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

  const lista = document.getElementById('especificaciones');

  vitrina.especificaciones.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    lista.appendChild(li);
  });
});
