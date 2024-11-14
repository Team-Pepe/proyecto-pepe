const taskForm = document.querySelector('#taskForm');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

// Escuchar el evento submit del formulario
taskForm.addEventListener('submit', event => {
  event.preventDefault();

  // Limpiar formulario
  if (event.submitter.id === "clear") {
    taskForm.reset();
  }

  // Guardar tarea
  if (event.submitter.id === "save") {
    const task = {
      title: event.target.title.value,
      description: event.target.description.value,
<<<<<<< HEAD
      categoria: event.target.categoria.value,
      dueDate: event.target.dueDate.value,
      category: event.target.category.value,
      category_description: event.target.category.options[event.target.category.selectedIndex].text,
=======
      category: event.target.categoria.value,
      estado: event.target.estado.value,
      estado_description: event.target.estado.options[event.target.estado.selectedIndex].text,
      dueDate: event.target.dueDate.value,
>>>>>>> 81ad9d8c59bc26783674a9c70d8c911ec9fa83b4
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
        <span>${index}</span>
        <h3 class= "title-edit" contenteditable="true">${task.title}</h3>
        <p class = "content-edit" contenteditable="true">${task.description}</p>
        <select class="edit-category" data-index="${index}">
          <option value="0" ${task.category == '0' ? 'selected' : ''}>Error</option>
          <option value="1" ${task.category == '1' ? 'selected' : ''}>Nueva funcionalidad</option>
          <option value="2" ${task.category == '2' ? 'selected' : ''}>Documentación</option>
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
    category: taskContainer.querySelector('.edit-category').value,
    category_description: taskContainer.querySelector('.edit-category').selectedOptions[0].text,
    status: taskList[index].status
>>>>>>> 81ad9d8c59bc26783674a9c70d8c911ec9fa83b4
  };

  taskList[index] = editedTask;
  localStorage.setItem('taskList', JSON.stringify(taskList)); // Actualiza el localStorage
  renderTasks(); // Vuelve a renderizar la lista
}


// Renderizar tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);
