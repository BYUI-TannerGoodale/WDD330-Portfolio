import {Employee} from './employeeClass.js';
import * as db from './fetchUtil.js';
// Main controller for conditional flow

export let currentUser;

// Define active user after log in
export class ActiveUser{
    constructor(Employee){
        this.employee = Employee;
    }
    isOwner(){
        if (this.employee.owner == true){
            return true;
        }
        return false;
    }
    isAdmin(){
        if (this.employee.admin == true){
            return true;
        }
        return false;
    }
    getSelfDetails(){
        return this.employee;
    }
}

export async function login(username, password){
    let user = await db.loginCheck(username, password);
    if (user === null){
        return 'Wrong Password, please try again'
    }
    let cUser = new ActiveUser(user);
    currentUser = cUser;
    return cUser;
}