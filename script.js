// my task data
let tasks = [];
let editId = null;

const inp = document.getElementById('inp');
const dateTime = document.getElementById('dateTime');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

function render() {
    if (tasks.length === 0) {
        list.innerHTML = `<div class="empty">
            <i class="fas fa-clipboard-list"></i>
            <p>No tasks yet. Add one to get started!</p>
        </div>`;
        return;
    }

    let html = '';
    for(let i = 0; i < tasks.length; i++) {
        const t = tasks[i];
        html += `<div class="task ${t.done ? 'done' : ''} ${editId === t.id ? 'editing' : ''}" data-id="${t.id}">
            <div class="chk ${t.done ? 'active' : ''}" onclick="toggle(${t.id})">
                ${t.done ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="info">
                <div class="txt">${t.text}</div>
                ${t.date ? `<div class="dt"><i class="fas fa-clock"></i> ${new Date(t.date).toLocaleString()}</div>` : ''}
            </div>
            <div class="actions">
                <button class="icon-btn edit-btn" onclick="edit(${t.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="icon-btn del-btn" onclick="del(${t.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
    }
    list.innerHTML = html;
}

// add new task or update existing
function addTask() {
    const text = inp.value.trim();
    if (!text) return;

    if (editId) {
        // update mode
        const task = tasks.find(t => t.id === editId);
        task.text = text;
        task.date = dateTime.value;
        editId = null;
        addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task';
    } else {
        // new task
        tasks.push({
            id: Date.now(),
            text: text,
            date: dateTime.value,
            done: false
        });
    }

    inp.value = '';
    dateTime.value = '';
    render();
}

function toggle(id) {
    const task = tasks.find(t => t.id === id);
    task.done = !task.done;
    render();
}

function edit(id) {
    const task = tasks.find(t => t.id === id);
    inp.value = task.text;
    dateTime.value = task.date;
    editId = id;
    addBtn.innerHTML = '<i class="fas fa-check"></i> Update Task';
    inp.focus();
}

function del(id) {
    tasks = tasks.filter(t => t.id !== id);
    // reset form if we're deleting the task being edited
    if (editId === id) {
        editId = null;
        inp.value = '';
        dateTime.value = '';
        addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task';
    }
    render();
}

addBtn.addEventListener('click', addTask);

inp.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

// initialize
render();
