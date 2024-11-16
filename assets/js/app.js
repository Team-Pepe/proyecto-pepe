const taskForm = document.querySelector('#taskForm');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

// Escuchar el evento submit del formulario
taskForm.addEventListener('submit', event => {
  event.preventDefault();

  // Guardar tarea
  if (event.submitter.id === "save") {
    const task = {
      title: event.target.title.value,
      description: event.target.description.value,
      categoria: event.target.categoria.value,
      dueDate: event.target.dueDate.value,
      category: event.target.category.value,
      category_description: event.target.category.options[event.target.category.selectedIndex].text,
      status: "active"
    };

    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    taskForm.reset();
    renderTasks(); // Llama a una función para renderizar las tareas
  }

});

// Renderizar tareas
function renderTasks() {
  const taskContainer = document.querySelector('#taskContainer');
  const taskContainerFinish = document.querySelector('#taskContainerFinish');
  taskContainer.innerHTML = '';
  taskContainerFinish.innerHTML = '';

  taskList.forEach((task, index) => {
    const isCompleted = task.status === 'completed';
    const taskHTML = `
      <article id="task-${index}">
        <h3 class="title-edit ${isCompleted ? 'readonly' : ''}" contenteditable="${!isCompleted}">${task.title}</h3>
        <p class="content-edit ${isCompleted ? 'readonly' : ''}" contenteditable="${!isCompleted}">${task.description}</p>
        <div>
          <span>Categoría:</span>
          <span class="category-edit" contenteditable="${!isCompleted}">${task.categoria}</span>
        </div>
        <input type="date" class="edit-date" ${isCompleted ? 'readonly' : ''} value="${task.dueDate}" data-index="${index}">
        <select class="edit-category" data-index="${index}">
          <option value="0" ${task.category == '0' ? 'selected' : ''}>En proceso</option>
          <option value="1" ${task.category == '1' ? 'selected' : ''}>Finalizar</option>
        </select>
        <button class="edit-task" data-index="${index}">Guardar</button>
        <button class="delete-task" data-index="${index}">Eliminar</button>
      </article>
    `;

    if (isCompleted) {
      taskContainerFinish.innerHTML += taskHTML;
    } else {
      taskContainer.innerHTML += taskHTML;
    }
  });

  // Agregar eventos de clic para los botones de eliminar y editar tarea
  document.querySelectorAll('.delete-task').forEach(button => {
    button.addEventListener('click', event => {
      const taskIndex = event.target.dataset.index;
      deleteTask(taskIndex);
    });
  });

  document.querySelectorAll('.edit-task').forEach(button => {
    button.addEventListener('click', event => {
      const taskIndex = event.target.dataset.index;
      saveEdits(taskIndex);
    });
  });

  // Deshabilitar edición para las tareas completadas
  document.querySelectorAll('.readonly').forEach(element => {
    element.setAttribute('contenteditable', 'false');
  });
}

// Función para eliminar una tarea específica
function deleteTask(index) {
  taskList.splice(index, 1); // Elimina la tarea del arreglo
  localStorage.setItem('taskList', JSON.stringify(taskList)); // Actualiza el localStorage
  renderTasks(); // Vuelve a renderizar la lista
}

// Función para guardar ediciones en una tarea específica
function saveEdits(index) {
  const taskContainer = document.querySelector(`#task-${index}`);
  const editedTask = {
    title: taskContainer.querySelector('h3').innerText,
    description: taskContainer.querySelector('p').innerText,
    categoria: taskContainer.querySelector('.category-edit').innerText,
    category: taskContainer.querySelector('.edit-category').value,
    category_description: taskContainer.querySelector('.edit-category').selectedOptions[0].text,
    dueDate: taskContainer.querySelector('.edit-date').value,
    status: taskContainer.querySelector('.edit-category').value === '1' ? 'completed' : 'active'
  };

  taskList[index] = editedTask;
  localStorage.setItem('taskList', JSON.stringify(taskList)); // Actualiza el localStorage
  renderTasks(); // Vuelve a renderizar la lista
}

// Renderizar tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);

// Función para buscar tareas por nombre
function searchTasks() {
  const searchValue = document.getElementById('taskSearch').value.toLowerCase();
  const taskContainer = document.getElementById('taskContainer');

  taskList.forEach((task, index) => {
    const taskHTML = document.getElementById(`task-${index}`);
    if (task.title.toLowerCase().includes(searchValue)) {
      taskHTML.style.display = 'block';
    } else {
      taskHTML.style.display = 'none';
    }
  });
}

// Agrega evento de cambio al input de búsqueda
document.getElementById('taskSearch').addEventListener('input', searchTasks);

// Llama a la función de búsqueda al cargar la página
document.addEventListener('DOMContentLoaded', searchTasks);