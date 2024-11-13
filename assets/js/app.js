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
  taskContainer.innerHTML = '';

  taskList.forEach((task, index) => {
    taskContainer.innerHTML += `
      <article>
        <span>${index}</span>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span>${task.status}</span>
        <span>${task.category_description}</span>
        <span>${task.category}</span>
        <button class="delete-task" data-index="${index}">Eliminar</button>
      </article>
    `;
  });

  // Agregar eventos de clic para los botones de eliminar tarea
  document.querySelectorAll('.delete-task').forEach(button => {
    button.addEventListener('click', event => {
      const taskIndex = event.target.dataset.index;
      deleteTask(taskIndex);
    });
  });
}

// Función para eliminar una tarea específica
function deleteTask(index) {
  taskList.splice(index, 1); // Elimina la tarea del arreglo
  localStorage.setItem('taskList', JSON.stringify(taskList)); // Actualiza el localStorage
  renderTasks(); // Vuelve a renderizar la lista
}

// Renderizar tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);
