const [
  formulario,
  lista,
  limpiarTareas,
  buscar,
  tarea,
  ] = [
    document.querySelector('#tareas-formulario'),
    document.querySelector('.lista'),
    document.querySelector('.limpiar-tareas'),
    document.querySelector('#buscar'),
    document.querySelector('#tarea'),
  ]

// -------------------------------  //
// Llamar los eventListener         //
// ------------------------------   //
const cargarEventListeners = () => {

  document.addEventListener( 'DOMContentLoaded', obtenerTareas);

  formulario.addEventListener('submit', agregarTarea);

  lista.addEventListener('click', borrarTarea);

  limpiarTareas.addEventListener('click', limpiarTodasLasTareas);

  buscar.addEventListener('keyup', buscarTareas);

}

// --------------- /
// Agregar tareas //
// ---------------//
const agregarTarea = (e) => {

  if(tarea.value === ''){
    alert('Agregar tarea en el campo');
    return;
  }

  const li = document.createElement('li');

  li.className = 'list-group-item item';

  li.appendChild(document.createTextNode(tarea.value));

  const borrar = document.createElement('a');

  borrar.className = 'borrar';

  borrar.innerHTML = '<i class="fas fa-times float-right text-danger"></i>';

  li.appendChild(borrar);

  lista.appendChild(li);

  // Guardo la tarea en el localStorage
  guardarTareaLocalStorage(tarea.value);

  tarea.value = '';

  e.preventDefault();
}

// -------------------------------  //
// Borrar tarea                     //
// ------------------------------   //
const borrarTarea = (e) => {
  if(e.target.parentElement.classList.contains('borrar')){
    if(confirm('¿Estás seguro de borrar esa tarea?')){
      e.target.parentElement.parentElement.remove();
    }

    // LocalStorage
    borrarTareaLocalStorage(e.target.parentElement.parentElement);
  }
}

// -------------------------------  //
// Limpiar todas las tareas         //
// ------------------------------   //
const limpiarTodasLasTareas = () => {
  while(lista.firstChild){
    lista.removeChild(lista.firstChild);
  }

  // LocalStorage
  limpiarTotasTareasLocalStorage();
}

// -------------------------------  //
// Buscar tareas                    //
// ------------------------------   //
const buscarTareas = (e) => {
  const texto = e.target.value.toLowerCase();
  
  document.querySelectorAll('.item').forEach( (tarea) => {
    const item = tarea.firstChild.textContent;
    if(item.toLowerCase().indexOf(texto) != -1) {
      tarea.style.display = 'block';
    } else {
      tarea.style.display = 'none';
    }
  });
}

// -------------------------------  //
// Obtener tareas del localStorage  //
// ------------------------------   //
const obtenerTareas = () => {
  let tareas;
  if(localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  tareas.forEach( (tarea) => {

    const li = document.createElement('li');

    li.className = 'list-group-item item';

    li.appendChild(document.createTextNode(tarea));

    const borrar = document.createElement('a');

    borrar.className = 'borrar';

    borrar.innerHTML = '<i class="fas fa-times float-right text-danger"></i>';

    li.appendChild(borrar);

    lista.appendChild(li);
  });
}

// -------------------------------  //
// Guardar tareas del localStorage  //
// ------------------------------   //
const guardarTareaLocalStorage = (tarea) => {
  let tareas;
  if(localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  tareas.push(tarea);

  localStorage.setItem('tareas', JSON.stringify(tareas));

}

// -------------------------------    //
// Borrar una tarea del localStorage  //
// ------------------------------     //
const borrarTareaLocalStorage = (tareaItem) => {
  let tareas;
  if(localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  tareas.forEach( (tarea, index) => {
    if(tareaItem.textContent === tarea) {
      tareas.splice(index, 1);
    }
  });

  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// --------------------------------------    //
// Borrar todas las tareas del localStorage  //
// -------------------------------------     //
const limpiarTotasTareasLocalStorage = () => {
  localStorage.clear();
}

// ------------------------ //
// Cargo los eventListeners //
// ------------------------ //
cargarEventListeners();

