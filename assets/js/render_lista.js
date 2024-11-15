// Función para renderizar tareas
function renderTasks() {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const taskContainer = document.querySelector('#taskContainer');
    taskContainer.innerHTML = '';

    taskList.forEach((task, index) => {
        const isCompleted = task.status === 'completed';
        if (!isCompleted) {
            const taskHTML = `
              <article id="task-${index}">
                <h3 class="title-edit" contenteditable="true">${task.title}</h3>
                <p class="content-edit" contenteditable="true">${task.description}</p>
                <div>
                  <span>Categoría:</span>
                  <span class="category-edit" contenteditable="true">${task.categoria}</span>
                </div>
                <input type="date" class="edit-date" value="${task.dueDate}" data-index="${index}">
                <select class="edit-category" data-index="${index}">
                  <option value="0" ${task.category == '0' ? 'selected' : ''}>En proceso</option>
                  <option value="1" ${task.category == '1' ? 'selected' : ''}>Finalizar</option>
                </select>
                <button class="edit-task" data-index="${index}">Guardar</button>
                <button class="delete-task" data-index="${index}">Eliminar</button>
              </article>
            `;
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
}

// Renderizar tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);
