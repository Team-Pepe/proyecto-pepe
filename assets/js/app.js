const taskForm = document.querySelector('#taskForm');
const taskList = [];
taskForm.addEventListener('submit', event => {
  event.preventDefault();
  
  if (event.submitter.id === "clear") {
    taskForm.reset();
  }
  
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
    renderTasks();
  }
});

function renderTasks() {
  const taskList_temp = JSON.parse(localStorage.getItem('taskList')) || [];
  const taskContainer = document.querySelector('#taskContainer');
  taskContainer.innerHTML = '';

  taskList_temp.forEach((task, index) => {
    taskContainer.innerHTML += `
      <article id="task-${index}">
        <span>${index}</span>
        <h3 contenteditable="true">${task.title}</h3>
        <p contenteditable="true">${task.description}</p>
        <span>${task.status}</span>
        <span>${task.category_description}</span>
        <span>${task.category}</span>
        <button onclick="saveEdits(${index})">Guardar Edición</button>
      </article>
    `;
  });
}

function saveEdits(index) {
  const taskContainer = document.querySelector(`#task-${index}`);
  const editedTask = {
    title: taskContainer.querySelector('h3').innerText,
    description: taskContainer.querySelector('p').innerText,
    category: taskList[index].category,
    category_description: taskList[index].category_description,
    status: taskList[index].status
  };
  
  taskList[index] = editedTask;
  localStorage.setItem('taskList', JSON.stringify(taskList));
  renderTasks();
}

renderTasks();
