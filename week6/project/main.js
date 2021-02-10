import * as util from './utilities.js';
import {ToDo} from './ToDos.js';

// Init
(()=>{
    if(!localStorage.getItem("toDoList")){
    // Init localStorage
    let test1 = new ToDo("Start Using To-Do List");
    let arr = [test1];
    arr = JSON.stringify(arr);
    localStorage.setItem("toDoList", arr);
    };
    // Init render
    util.render(JSON.parse(localStorage.getItem("toDoList")));
    // Init event listeners
    document.getElementById("submitToDo").addEventListener("click", () => {
        util.addToDo();
    })
    document.getElementById("allFilter").addEventListener("click", () => {
        util.renderAll();
    });
    document.getElementById("activeFilter").addEventListener("click", () =>{
        util.renderActive();
    });
    document.getElementById("compleatedFilter").addEventListener("click", () =>{
        util.renderComplete();
    })
})();