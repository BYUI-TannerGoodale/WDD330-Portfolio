import * as lsHelpers from './ls.js';
import {ToDo} from './ToDos.js';
// Additional utilites module

// Render ToDos
export function render(Arr){
    const ul = document.querySelector('ul');
    const input = document.getElementById('content');
    ul.innerHTML = "";
    input.value = "";
    Arr.forEach(ToDo => {
        let li = document.createElement('li');
        let div = document.createElement('div');
        let input = document.createElement('input');
        input.type = "checkbox";
        if(ToDo.completed === true){
            input.checked = true;
        }
        input.addEventListener('click', () => {
            checkBoxStatus(event);
        });
        div.appendChild(input);
        let span = document.createElement('span');
        span.innerHTML = ToDo.content;
        if(ToDo.completed === true){
            span.className = "completed"
        };
        div.appendChild(span);
        let button = document.createElement('button');
        button.addEventListener('click', () => {
            deleteToDo(event);
        });
        button.innerHTML = "X";
        button.className = "delete-btn"
        div.appendChild(button);
        div.dataset.id = ToDo.timestamp;
        li.appendChild(div);
        ul.appendChild(li);
    });
    calcTasksLeft();
}

// Check checkbox status
export function checkBoxStatus(event){
    if(event.currentTarget.checked){
        const currentToDo = findToDo(event.currentTarget.parentNode.dataset.id);
        markComplete(currentToDo);
    } else {
    const currentToDo = findToDo(event.currentTarget.parentNode.dataset.id);
    unMarkComplete(currentToDo);
    }
    render(lsHelpers.loadToDoList());
}

function calcTasksLeft(){
    let count = 0;
    let toDoList = lsHelpers.loadToDoList();
    toDoList.forEach(ToDo => {
        if(ToDo.completed === false){
            count++;
        };
    });
    document.getElementById("tasksLeft").innerHTML = `${count} tasks left`;
}

// Find a ToDo from it's unique id (it's timestamp).
function findToDo(id){
    return lsHelpers.loadToDoList().find(toDo => toDo.timestamp == id);
}

// Add toDos functionality
export function addToDo(){
    let content = document.getElementById('content').value;
    let newToDo = new ToDo(content);
    lsHelpers.saveToLS(newToDo);
    render(lsHelpers.loadToDoList());
}

// Mark event as complete
function markComplete(ToDo){
    const toDoList = lsHelpers.loadToDoList();
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i].timestamp === ToDo.timestamp){
            toDoList[i].completed = true;
            lsHelpers.saveToDoList(toDoList);
        };
    };
}

// Unmark event as complete
function unMarkComplete(ToDo){
    const toDoList = lsHelpers.loadToDoList();
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i].timestamp === ToDo.timestamp){
            toDoList[i].completed = false;
            lsHelpers.saveToDoList(toDoList);
        };
    };
}

// Delete ToDo
export function deleteToDo(event){
    console.log(event.currentTarget.parentNode.dataset.id);
    const currentToDoId = event.currentTarget.parentNode.dataset.id;
    const toDoList = lsHelpers.loadToDoList();
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i].timestamp == currentToDoId){
            toDoList.splice(i, 1);
            console.log(toDoList);
            lsHelpers.saveToDoList(toDoList);
        };
    };
    render(lsHelpers.loadToDoList());
}

// Filtering functions

// Render All
export function renderAll(){
    const toDoList = lsHelpers.loadToDoList();
    render(toDoList);
}

export function renderActive(){
    let activeList = [];
    let toDoList = lsHelpers.loadToDoList();
    toDoList.forEach(ToDo => {
        if(ToDo.completed === false){
            activeList.push(ToDo);
        };
    });
    render(activeList);
}

export function renderComplete(){
    let activeList = [];
    let toDoList = lsHelpers.loadToDoList();
    toDoList.forEach(ToDo => {
        if(ToDo.completed === true){
            activeList.push(ToDo);
        };
    });
    render(activeList);
}