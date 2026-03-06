let tasks = [];

function addTask() {

    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false,
        editing: false
    });

    input.value = "";
    render();

}

function toggleComplete(i) {

    tasks[i].completed = !tasks[i].completed;
    render();

}

function deleteTask(i) {

    tasks.splice(i, 1);
    render();

}

function startEdit(i) {

    tasks[i].editing = true;
    render();

}

function saveEdit(i, value) {

    tasks[i].text = value;
    tasks[i].editing = false;
    render();

}

function render() {

    const list = document.getElementById("taskList");
    const search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    tasks
        .filter(t => t.text.toLowerCase().includes(search))
        .forEach((task, index) => {

            const li = document.createElement("li");

            const left = document.createElement("div");
            left.className = "left";

            const check = document.createElement("div");
            check.className = "check";
            if (task.completed) check.classList.add("done");

            check.onclick = () => toggleComplete(index);

            left.appendChild(check);

            if (task.editing) {

                const input = document.createElement("input");
                input.value = task.text;
                input.className = "edit-input";

                input.onblur = () => saveEdit(index, input.value);

                input.onkeypress = (e) => {
                    if (e.key === "Enter") saveEdit(index, input.value);
                };

                left.appendChild(input);

            } else {

                const span = document.createElement("span");
                span.textContent = task.text;
                span.className = "task";

                if (task.completed) span.classList.add("completed");

                left.appendChild(span);

            }

            const actions = document.createElement("div");
            actions.className = "actions";

            const edit = document.createElement("button");
            edit.textContent = "Edit";
            edit.className = "edit";
            edit.onclick = () => startEdit(index);

            const del = document.createElement("button");
            del.textContent = "Delete";
            del.className = "delete";
            del.onclick = () => deleteTask(index);

            actions.appendChild(edit);
            actions.appendChild(del);

            li.appendChild(left);
            li.appendChild(actions);

            list.appendChild(li);

        });

}

function toggleMode() {

    document.body.classList.toggle("dark");

}

document.getElementById("taskInput")
    .addEventListener("keypress", function (e) {

        if (e.key === "Enter") addTask();

    });
