const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
function addTask() {
    const task = taskInput.value;
    taskList.innerHTML += `<li>${task}</li>`;
    taskInput.value = '';
    saveTask(task);
}
let count = 1;
function saveTask(task) {
    localStorage.setItem(count, JSON.stringify(task));
    count++;
}
function loadTask() {
    if (Object.keys(localStorage).length === 0) {
        return;
    } else {
        for (let i = 1; i <= Object.keys(localStorage).length; i++) {
            let data = localStorage.getItem(i);
            data = JSON.parse(data);
            const listItem = document.createElement('li');
            listItem.textContent = `${i})${data}`;
            taskList.appendChild(listItem);
        }
    }
}
document.addEventListener("DOMContentLoaded", loadTask);
