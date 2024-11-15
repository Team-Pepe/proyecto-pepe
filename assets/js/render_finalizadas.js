// Función para renderizar tareas finalizadas
function renderCompletedTasks(filter = '') {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.innerHTML = '';

    taskList.forEach((task, index) => {
        const isCompleted = task.status === 'completed';
        if (isCompleted && task.title.toLowerCase().includes(filter.toLowerCase())) {
        const taskHTML = `
            <article id="task-${index}">
                <h3 class="title-edit readonly">${task.title}</h3>
                <p class="content-edit readonly">${task.description}</p>
                <div>
                    <span>Categoría:</span>
                    <span class="category-edit readonly">${task.categoria}</span>
                </div>
                <input type="date" class="edit-date" value="${task.dueDate}" readonly>
                <select class="edit-category" data-index="${index}" disabled>
                    <option value="0" ${task.category == '0' ? 'selected' : ''}>En proceso</option>
                    <option value="1" ${task.category == '1' ? 'selected' : ''}>Finalizar</option>
                </select>
            </article>
        `;
        taskContainer.innerHTML += taskHTML;
        }
    });
}

  // Renderizar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderCompletedTasks();

    // Agregar evento de cambio al input de búsqueda
    const searchInput = document.getElementById('taskSearch');
    if (searchInput) {
        searchInput.addEventListener('input', searchCompletedTasks);
    }
});

  // Función para buscar tareas finalizadas
function searchCompletedTasks(event) {
    const filter = event.target.value;
    renderCompletedTasks(filter);
}
