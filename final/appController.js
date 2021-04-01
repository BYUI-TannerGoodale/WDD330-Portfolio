import * as ls from './lsHelpers.js';
import * as userUtil from './userClass.js';
import * as ve from './viewEngine.js';
// Initialization file

(async function(){
    ls.initData();
    document.getElementById("loginBtn").addEventListener('click', (e)=>{
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let user = asyncLogin(username, password)
        .then((res)=>{
            user = res;
            if(user.isOwner()){
                console.log('Hello Owner'); // Routing Logic will have to be run here from controller module.
                ve.renderView(user);
            };
            if(user.isAdmin() && !user.isOwner()){
                console.log(`Hello Admin ${user.employee.firstName} ${user.employee.lastName}`);
                ve.renderView(user);
            };
            if(!user.isOwner() && !user.isAdmin()){
                console.log(`Welcome, ${user.employee.firstName} ${user.employee.lastName}`);
                ve.renderView(user);
            };
        });
    })
})();

async function asyncLogin(username, password){
    let user = await userUtil.login(username, password);
    return user;
}

