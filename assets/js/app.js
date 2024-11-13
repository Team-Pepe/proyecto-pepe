const taskForm = document.querySelector('#taskForm');
const taskList = [];
taskForm.addEventListener('submit', event => {
  event.preventDefault();
  
  if(event.submitter.id === "clear") {
    taskForm.reset();
  }
  
  if(event.submitter.id === "save") {
    const task = {
      title: event.target.title.value,
      description: event.target.description.value,
      category: event.target.category.value,
      category_description: event.target.category.options[event.target.category.selectedIndex].text,
      status: "active"
    };

    // Agregar la tarea al arreglo taskList y guardarla en el localStorage
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    taskForm.reset();
    
    // Obtener las tareas del localStorage y volver a renderizarlas
    const taskList_temp = JSON.parse(localStorage.getItem('taskList'));
    const taskContainer = document.querySelector('#taskContainer');
    
    // Limpiar el contenido de taskContainer antes de renderizar las tareas
    taskContainer.innerHTML = '';
    
    if(taskList_temp) {
      taskList_temp.forEach((task, index) => {
        taskContainer.innerHTML += `
          <article>
            <span>${index}</span>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <span>${task.status}</span>
            <span>${task.category_description}</span>
            <span>${task.category}</span>
          </article>
        `;
      });
    }
  }
});
