import * as ls from './lsHelpers.js';
import {Employee} from './employeeClass.js';
import * as ve from './viewEngine.js';
// Fetch API shortcuts and definitions (To simulate RESTful application)

const baseURL = 'http://fakeapi.jsonparseronline.com/';

// Handle when someone tries to log in
export async function loginCheck(username, password){
    // Done to simulate REST operation
    const user = ls.findUserLogin(username, password);
    if(user === null){
        ve.loginErrorMsg();
        return;
    }
    let userID = user.id;
    await fetch(`${baseURL}users/${userID}`)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }
    })
    .then((data)=>{
        localStorage.setItem('res', JSON.stringify(data));
    });
    if(localStorage.getItem('res')){
        localStorage.removeItem('res');
        return user;
    }
    return console.log('There was an error, please try again');
}

export async function getEmpById(id){
    // Done to simulate REST operation
    await fetch(`${baseURL}users/${id}`)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }
    })
    .then((data)=>{
        localStorage.setItem('res', JSON.stringify(data));
    });
    if(localStorage.getItem('res')){
        localStorage.removeItem('res');
        return ls.findEmpById(id);
    }
    return console.log('There was an error, please try again');
}

export async function getDB(){
    await fetch(`${baseURL}users`)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }
    })
    .then((data)=>{
        localStorage.setItem('res', JSON.stringify(data));
    });
    if(localStorage.getItem('res')){
        localStorage.removeItem('res');
        return ls.loadDB();
    };
}

export async function editEmp(curEmp){
    // Get and verify inputs
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let department = document.getElementById('department').value;
    let pay = document.getElementById('pay').value;
    let status = document.getElementById('status').value;
    let admin = document.getElementById('admin').value;
    let userName = `${firstName}${lastName}@work.co`;

    if(!firstName == '' && !lastName == '' && !department == '' && !pay == '' && !status == '' && !admin == ''){
        curEmp.firstName = firstName;
        curEmp.lastName = lastName;
        curEmp.department = department;
        curEmp.pay = pay;
        curEmp.status = status;
        curEmp.userName = userName;
        if(admin == 'Admin'){
            curEmp.admin = true;
        } else {
            curEmp.admin = false;
        }
    }

    await fetch(`${baseURL}users/${curEmp.id}`, {
        "method": "PUT",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            department: department,
            pay: pay,
            status: status,
            admin: admin
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res)=>{
        if(res.ok){
            ls.editEmp(curEmp)
        }
    })
}

export async function addNewEmp(){
    let id = ls.genNextID();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let department = document.getElementById('department').value;
    let pay = document.getElementById('pay').value;
    let status = document.getElementById('status').value;
    let admin = document.getElementById('admin').value;
    let startDate = new Date().toDateString();

    if(!firstName == '' && !lastName == '' && !department == '' && !pay == '' && !status == '' && !admin == ''){
        if(admin == 'Admin'){
            admin = true;
        } else {
            admin = false;
        }

        let tempPassword = 'Password';

        let newEmp = new Employee(id, firstName, lastName, tempPassword, department, pay, status, startDate, admin);

        await fetch(`${baseURL}users`, {
            "method": "POST",
            body: JSON.stringify({
                id: newEmp.id,
                firstName: newEmp.firstName,
                lastName: newEmp.lastName,
                password: newEmp.tempPassword,
                department: newEmp.department,
                pay: newEmp.pay,
                status: newEmp.status,
                startDate: newEmp.startDate,
                admin: newEmp.admin,
                owner: newEmp.owner
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res)=>{
            if(res.ok){
                ls.addNewEmp(newEmp);
            }
        })
    } else {
        // Return add view, remind user to fill in all fields. 
    }
}

export async function changePassword(user){
    let id = user.employee.id;
    let password = document.querySelector('#password').value;

    if(!password == ''){
        user.employee.password = password;

        await fetch(`${baseURL}users/${id}`, {
            "method": "PUT",
            body: JSON.stringify({
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res)=>{
            if(res.ok){
                ls.editUser(user.employee);
            }
        })

    }
}