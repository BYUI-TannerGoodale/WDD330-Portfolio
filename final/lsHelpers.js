import {Employee} from './employeeClass.js';
import * as ve from './viewEngine.js';
import {currentUser} from './userClass.js';
// LocalStorage helper functions, used to simulate database storage

// Initiate test data for application
export function initData(){
    // Initialize data if this is the first time the app runs.
    if(!localStorage.getItem('compDB')){
        let owner = new Employee(1, 'Owner', 'Admin', 'Password', 'All', 72000, 'Active', new Date('Jan 25 2018').toDateString(), true, true);
        let john = new Employee(2, 'John', 'Ward', 'Password', 'Accounting', 43000, 'Active', new Date('Mar 24 2018').toDateString(), true);
        let peter = new Employee(3, 'Peter', 'Jones', 'Password', 'Shipping', 41000, 'Active', new Date('Jul 6 2018').toDateString(), true);
        let ashley = new Employee(4, 'Ashley', 'Lemmit', 'Password', 'Sales', 41000, 'Active', new Date('Feb 20 2018').toDateString(), true);
        let adam = new Employee(6, 'Adam', 'Herring', 'Password', 'HR', 49000, 'Active', new Date('Mar 30 2020').toDateString(), true);
        let mac = new Employee(5, 'Mac', 'Lemmit', 'Password', 'Sales', 32000, 'Active', new Date('Feb 20 2018').toDateString());
        let tanner = new Employee(7, 'Tanner', 'Goodale', 'Password', 'HR', 32000, 'Active', new Date('Mar 30 2020').toDateString());
        let james = new Employee(7, 'James', 'Preston', 'Password', 'Accounting', 32000, 'Active', new Date('Mar 30 2020').toDateString());
        let Keven = new Employee(7, 'Keven', 'Malone', 'Password', 'Accounting', 23000, 'Active', new Date('Mar 30 2020').toDateString());
        console.log(owner);
        console.log(john);
        console.log(peter);
        console.log(ashley);
        console.log(adam);
        console.log(mac);
        console.log(tanner);
        let arr = [owner, john, peter, adam, ashley, mac, tanner];
        arr = JSON.stringify(arr);
        localStorage.setItem('compDB', arr);
    } else {
        console.log(JSON.parse(localStorage.getItem('compDB'))); // For tests
    }

}

export function loadDB(){
    if(localStorage.getItem("compDB")){
        const list = JSON.parse(localStorage.getItem("compDB"));
        return list;
    }
}

export function genNextID(){
    let dataSet = JSON.parse(localStorage.getItem('compDB'));
    for(let i = 0; i < dataSet.length; i++){
        if(!dataSet[i].id == i + 1){
            return i + 1;
        }
        else {
            return dataSet.length + 1;
        }
    }
}

function saveDB(list){
    if(localStorage.getItem("compDB")){
        let jsonList = JSON.stringify(list);
        localStorage.setItem("compDB", jsonList);
        ve.renderEditOKView(currentUser);
    }
}

function saveDBUserEdit(list){
    if(localStorage.getItem("compDB")){
        let jsonList = JSON.stringify(list);
        localStorage.setItem("compDB", jsonList);
        ve.renderUserEditOKView(currentUser);
    }
}

export function findEmpById(id){
    return loadDB().find(emp => emp.id === id);
}

export function findUserLogin(username, password){
    let user = loadDB().find(user => user.userName === username);
    if(user === undefined){
        return null;
    }
    if(password === user.password){
        return user;
    }
    // Add error render if user is undefined or null or if password was incorrect.
    return null;
}

export function editEmp(curEmp){
    let modifedEmp = curEmp;
    let db = loadDB();
    let index = db.findIndex(emp => emp.id === curEmp.id);
    db[index] = modifedEmp;
    saveDB(db);
}

export function editUser(user){
    let modifedUser = user;
    let db = loadDB();
    let index = db.findIndex(emp => emp.id === user.id);
    db[index] = modifedUser;
    saveDBUserEdit(db);
}

export function addNewEmp(newEmp){
    let db = loadDB();
    db.push(newEmp);
    saveDB(db);
}