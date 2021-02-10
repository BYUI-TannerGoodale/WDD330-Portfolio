import {ToDo} from './ToDos.js';
// Local storage helpers module

// Load ToDos
// If toDoList is in localStorage, load it and convert the string list into an object array, return it.
// If toDoList is not in localStorage, make a first ToDo Object and save it to localStorage, then call function again. 
export function loadToDoList(){
    if(localStorage.getItem("toDoList")){
        const list = JSON.parse(localStorage.getItem("toDoList"));
        return list;
    }
}

// Store ToDos
// Load toDoList array, push the new ToDo Object into the array, save the new toDoList to localStorage
export function saveToLS(ToDoObj){
    let toDoList = loadToDoList();
    toDoList.push(ToDoObj);
    toDoList = JSON.stringify(toDoList);
    localStorage.setItem("toDoList", toDoList);
}
// Save whole ToDo array
export function saveToDoList(Arr){
    const newList = JSON.stringify(Arr);
    localStorage.setItem("toDoList", newList);
}

