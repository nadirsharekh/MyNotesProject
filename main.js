let index = numberOfNotes();
function numberOfNotes() {
    return localStorage.counter || 0;
}

function clearInputs() {
    document.getElementById("textarea").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
}

function saveTask() {
    const textarea = document.getElementById("textarea").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (textarea === "") {
        alert("Your Task Empty!");
        return;
    }
    if (date === "") {
        alert("Date required!");
        return;
    }
    if (time === "") {
        alert("Time required!");
        return;
    }
    if (!validateExpiredTask(date, time)) {
        alert("Date Task Expired!");
        return;
    }
    index++;
    localStorage.setItem("counter", index);
    const key = "note" + index;
    const note = { "textarea": textarea, "date": date, "time": time };
    localStorage.setItem(key, JSON.stringify(note));
    printNote(note, key);
    clearInputs();
}

function printNote(note, key = 0) {
    const newTask = document.getElementById("newTasks");
    let div = document.createElement('div');
    let span = document.createElement('span');
    let spanX = document.createElement('span');
    let textareaTask = document.createElement('textarea');
    let pDate = document.createElement('p');
    let pTime = document.createElement('p');
    spanX.id = key;
    spanX.setAttribute("onclick", `deleteTask("${key}")`);

    div.className = "notebg fade-in";
    div.id = "notebg" + key;
    span.id = "noteDetails";
    spanX.className = "glyphicon glyphicon-remove-circle";
    textareaTask.innerText = note.textarea;
    textareaTask.id = "textareaTask";
    pDate.innerText = note.date;
    pDate.id = "pDate";
    pTime.innerText = note.time;
    pTime.id = "pTime";

    span.appendChild(spanX);
    span.appendChild(textareaTask);
    span.appendChild(pDate);
    span.appendChild(pTime);
    div.appendChild(span);
    newTask.appendChild(div);
}

function deleteTask(key) {
    console.log(key);
    localStorage.removeItem(key);

    let Task = document.getElementById('notebg' + key);
    let xIcon = document.getElementById(key);
    xIcon.outerHTML = "";
    delete xIcon;
    Task.className = 'notebg fade-out';
    setTimeout(function () {
        Task.outerHTML = "";
        delete Task;
    }, 1000)
}
document.body.onload = function () {
    loadPage();
}

function loadPage() {
    if (localStorage.length > 0) {
        let counter = localStorage.getItem('counter');
        while (counter > 0) {
            let key = "note" + counter;
            const element = localStorage.getItem(key);
            if (element != null) {
                const obj = JSON.parse(element);
                if (validateExpiredTask(obj.date, obj.time)) {
                    printNote(obj, key);
                } else {
                    deleteTask(key);
                }
            }
            counter--;
        }
    }
}

function validateExpiredTask(date, time) {
    let dateAndTime = Date.parse(date + " " + time);
    if (dateAndTime > new Date().getTime()) {
        return true;
    } else {
        return false;
    }
}
