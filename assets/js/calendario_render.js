let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        renderCalendar(currentMonth, currentYear);
    });
});

function renderCalendar(month, year) {
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    document.getElementById('monthYear').innerText = `${months[month]} ${year}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement('td');
                cell.textContent = date;
                if (date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                    cell.classList.add('today');
                }
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
    }
}

// Actualizar el calendario diariamente
setInterval(() => {
    const today = new Date();
    if (today.getDate() === 1) {
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
    }
    renderCalendar(currentMonth, currentYear);
}, 86400000); // Actualiza cada 24 horas (86400000 ms)