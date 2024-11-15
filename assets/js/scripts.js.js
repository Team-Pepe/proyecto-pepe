// Función para abrir el menú lateral
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

// Función para cerrar el menú lateral
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// Guardar tareas al enviar el formulario
const taskForm = document.querySelector('#taskForm');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

if (taskForm) {
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
        }
    });
}
