import * as db from './fetchUtil.js';
import {currentUser} from './userClass.js'; // Used to save user state across app.
// View engine class, methods and functions

export function renderView(user){
    // Clear data from past views
    let main = document.querySelector('main');
    let nav = document.querySelector('nav');
    main.innerHTML = '';
    nav.innerHTML = '';
    nav.classList = '';
    if(!document.querySelector('#logout')){
    addLogout();
    }
    if(user.isOwner()){
        genAdminNavLinks();
        ownerHomeView();
    };
    if(user.isAdmin() && !user.isOwner()){
        genAdminNavLinks();
        adminHomeView(user.employee);
    };
    if(!user.isAdmin() && !user.isOwner()){
        genEmployeeNavLinks();
        employeeHomeView(user.employee);
    };
};

export function loginErrorMsg(){
    let error = document.querySelector('#error');
    error.innerHTML =`
    <span class="err">The username or password was not recognized</span>
    <br>
    <span class="err">Please try again or contact your system administrator</span>
    <br>
    <br>
    `;
    // Handle getting rid of the error message if the user enters an input field again.
    document.querySelector('#username').addEventListener('click', ()=>{
        error.innerHTML = '';
    });
    document.querySelector('#password').addEventListener('click', ()=>{
        error.innerHTML = '';
    });
}

function addLogout(){
    let header = document.querySelector('header');
    let logout = document.createElement('span');
    logout.innerHTML = "Logout";
    logout.id = 'logout';
    logout.addEventListener('click', ()=>{
        document.location.reload();
    });
    header.appendChild(logout);
}

async function ownerHomeView(){
    let compData = await db.getDB();

    // Variables for report data
    let employeeCount = compData.length - 1;
    let adminList = [];
    let activeList = [];
    let inactiveList = [];

    // Generate report data
    compData.forEach(employee => {
        if(employee.admin && !employee.owner){
            adminList.push(employee);
        }
        if(employee.status == 'Active' && !employee.owner){
            activeList.push(employee);
        }
        if(employee.status == 'Inactive'){
            inactiveList.push(employee);
        }
    });
    
    // Generate a view
    let section = document.createElement('section');
    section.classList = 'container padd';
    let p = document.createElement('p');
    p.innerHTML = `Current number of admins: ${adminList.length}`;
    section.appendChild(p);
    let htmlAdminList = document.createElement('ul');
    htmlAdminList.classList = 'container';
    adminList.forEach(admin => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.innerHTML = `ID# ${admin.id}, ${admin.firstName} ${admin.lastName}`;
        span.classList = 'adminLink';
        span.dataset.id = admin.id;
        span.addEventListener('click', (e) => {
            renderAdminData(e);
        });
        li.appendChild(span);
        htmlAdminList.appendChild(li);
    })
    section.appendChild(htmlAdminList);
    
    let main = document.querySelector('main');
    let initContent =`
    <section class="container">
    <h3>Welcome Owner</h3>
    </section>
    <section class="container padd">
        <p>Current number of employees: ${employeeCount}</p>
        <ul class='container'>
            <li>${activeList.length} active</li>
            <li>${inactiveList.length} inactive</li>
        </ul>
    </section>
    `;
    main.innerHTML = initContent;
    main.appendChild(section);
};

async function adminHomeView(admin){
    let compData = await db.getDB();
    let dept = admin.department;

    // Generate staff report for admin's department only
    let deptStaff = [];
    compData.forEach(employee => {
        if(employee.department == dept){
            deptStaff.push(employee);
        }
    });

    // Variables for report data
    let employeeCount = deptStaff.length;
    let adminList = [];
    let activeList = [];
    let inactiveList = [];

    // Generate report data
    deptStaff.forEach(employee => {
        if(employee.admin){
            adminList.push(employee);
        }
        if(employee.status == 'Active'){
            activeList.push(employee);
        }
        if(employee.status == 'Inactive'){
            inactiveList.push(employee);
        }
    });

    // Generate view
    let section = document.createElement('section');
    section.classList = 'container padd';
    let p = document.createElement('p');
    p.innerHTML = `Current number of admins in ${admin.department}: ${adminList.length}`;
    section.appendChild(p);
    let htmlAdminList = document.createElement('ul');
    htmlAdminList.classList = 'container';
    adminList.forEach(_admin => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.innerHTML = `ID# ${_admin.id}, ${_admin.firstName} ${_admin.lastName}`;
        span.classList = 'adminLink';
        span.dataset.id = _admin.id;
        span.addEventListener('click', (e) => {
            renderAdminData(e);
        });
        li.appendChild(span);
        htmlAdminList.appendChild(li);
    })
    section.appendChild(htmlAdminList);
    
    let main = document.querySelector('main');
    let initContent =`
    <section class="container">
    <h3>Welcome ${admin.firstName}</h3>
    </section>
    <section class="container padd">
        <p>Current number of employees in ${admin.department}: ${employeeCount}</p>
        <ul class='container'>
            <li>${activeList.length} active</li>
            <li>${inactiveList.length} inactive</li>
        </ul>
    </section>
    `;
    main.innerHTML = initContent;
    main.appendChild(section);
};

async function employeeHomeView(user){
    let compData = await db.getDB();
    let dept = user.department;

    // Generate staff report for admin's department only
    let deptStaff = [];
    compData.forEach(employee => {
        if(employee.department == dept){
            deptStaff.push(employee);
        }
    });

    // Variables for report data
    let adminList = [];
    let activeList = [];

    // Generate report data
    deptStaff.forEach(employee => {
        if(employee.admin){
            adminList.push(employee);
        }
        if(employee.status == 'Active'){
            activeList.push(employee);
        }
    });
    // Populate a view showing how many employee's are active in department and who the reporting admin is
    let main = document.querySelector('main');
    let initContent =`
    <section class="container">
    <h3>Welcome ${user.firstName}</h3>
    </section>
    <section class="container padd">
        <div id="adminList">
            <p>Your reporting admins are,</p>
        </div>
        <p>There are ${activeList.length} active members in your team</p>
    </section>
    `;
    main.innerHTML = initContent;
    let admins = genAdminListEmpHomeView(adminList);
    document.querySelector('#adminList').appendChild(admins);
};

function genAdminListEmpHomeView(list){
    let ul = document.createElement('ul');
    list.forEach(admin => {
        let li = document.createElement('li');
        li.innerHTML = `${admin.firstName} ${admin.lastName}`;
        ul.appendChild(li);
    });
    return ul;
};

function genEmployeeNavLinks(){
    let nav = document.querySelector('nav');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');

    let actStngLnk = document.createElement('span');
    actStngLnk.innerHTML = "Account Settings";
    actStngLnk.classList = "navLink";
    actStngLnk.addEventListener('click', ()=>{
        renderActStngsView(currentUser);
    });

    let backlink = document.createElement('span');
    backlink.innerHTML = "Home";
    backlink.classList = "navLink";
    backlink.addEventListener('click', ()=>{
        renderView(currentUser);
    });

    li1.appendChild(backlink);
    li2.appendChild(actStngLnk);
    ul.appendChild(li1);
    ul.appendChild(li2);
    nav.appendChild(ul);
    nav.classList = "navBar";
}

async function renderAdminData(e){
    // Get admin data from bd
    let adminId = Number(e.target.dataset.id);
    let curAdmin = await db.getEmpById(adminId);
    
    if(currentUser.isOwner()){
        // Render data
        let main = document.querySelector('main');
        let initContent =`
        <section class='container'>
            <h2>Admin Data<h2>
        </section>
        <section class="container padd">
            <p>Name: ${curAdmin.firstName} ${curAdmin.lastName}</p>
            <p>ID#: ${curAdmin.id}</p>
            <p>Department: ${curAdmin.department}</p>
            <p>Salery: $${curAdmin.pay}</p>
            <p>Start Date: ${curAdmin.startDate}</p>
            <p>Status: ${curAdmin.status}</p>
            <p>Email: ${curAdmin.userName}</p>
        </section>
        `;
        main.innerHTML = initContent;
        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList = 'btnf';
        editBtn.addEventListener('click', ()=>{
            renderEditForm(curAdmin);
        });
        main.appendChild(editBtn);
        let backBtn = document.createElement('button');
        backBtn.innerHTML = 'Go Back';
        backBtn.classList = 'btnf';
        if(e.target.dataset.empMngView == 'true'){
            backBtn.addEventListener('click', ()=>{
                renderEmpMgmtView(currentUser);
            });
        } else {
            backBtn.addEventListener('click', ()=>{
                renderView(currentUser);
            });
        }
        main.appendChild(backBtn);
    }
    if(currentUser.isAdmin() && !currentUser.isOwner()){
        let main = document.querySelector('main');
        let initContent =`
        <section class='container'>
            <h2>Admin Data<h2>
        </section>
        <section class="container padd">
            <p>Name: ${curAdmin.firstName} ${curAdmin.lastName}</p>
            <p>ID#: ${curAdmin.id}</p>
            <p>Status: ${curAdmin.status}</p>
            <p>Email: ${curAdmin.userName}</p>
        </section>
        `;
        main.innerHTML = initContent;
        let backBtn = document.createElement('button');
        backBtn.innerHTML = 'Go Back';
        backBtn.classList = 'btnf';
        if(e.target.dataset.empMngView == 'true'){
            backBtn.addEventListener('click', ()=>{
                renderEmpMgmtView(currentUser);
            });
        } else {
            backBtn.addEventListener('click', ()=>{
                renderView(currentUser);
            });
        }
        main.appendChild(backBtn);
    }
}

function genAdminNavLinks(){
    let nav = document.querySelector('nav');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');

    let backlink = document.createElement('span');
    backlink.innerHTML = "Home";
    backlink.classList = "navLink";
    backlink.addEventListener('click', ()=>{
        renderView(currentUser);
    });

    let empMgmtLink = document.createElement('span');
    empMgmtLink.innerHTML = "Employee Managment";
    empMgmtLink.classList = 'navLink';
    empMgmtLink.addEventListener('click', ()=>{
        renderEmpMgmtView(currentUser);
    });

    let actStngLnk = document.createElement('span');
    actStngLnk.innerHTML = "Account Settings";
    actStngLnk.classList = "navLink";
    actStngLnk.addEventListener('click', ()=>{
        renderActStngsView(currentUser);
    });
    
    li1.appendChild(backlink);
    li2.appendChild(empMgmtLink);
    li3.appendChild(actStngLnk);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    nav.appendChild(ul);
    nav.classList = "navBar";
}

function makeIdNameList(list){
    let ul = document.createElement('ul');
    ul.id = 'list';
    list.forEach(employee => {
        if(!employee.owner){
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.dataset.id = employee.id;
            span.dataset.empMngView = 'true';
            span.innerHTML = `ID# ${employee.id}, ${employee.firstName} ${employee.lastName}`;
            span.classList = 'empLinks';
            span.addEventListener('click', (e)=>{
                renderThisEmpOptions(e);
            }) //Render employee options when clicked
            li.classList= 'empLi';
            li.appendChild(span);
            ul.appendChild(li);
        }
    })
    return ul;
}

function filterByDepartment(list){
    let filter = document.querySelector('#dep').value;
    let main = document.querySelector('main');
    if(filter == "no_select"){
        let newList = makeIdNameList(list);
        main.replaceChild(newList, document.querySelector('#list'));
        return;
    }
    let ul = document.createElement('ul');
    ul.id = 'list';
    list.forEach(employee => {
        if(!employee.owner && employee.department == filter){
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.dataset.id = employee.id;
            span.innerHTML = `ID# ${employee.id}, ${employee.firstName} ${employee.lastName}`;
            span.classList = 'empLinks';
            span.addEventListener('click', (e)=>{
                renderThisEmpOptions(e);
            }) //Render employee options when clicked
            li.classList= 'empLi';
            li.appendChild(span);
            ul.appendChild(li);
        }
    })
    main.replaceChild(ul, document.querySelector('#list'));
}

async function renderEmpMgmtView(currentUser){
    //console.log(currentUser);
    // Populate a view of all employees for owner (minus owner him/herself)
    // View will consist of ID/name list of employees w/ filters for searching
    // Add employee button will be rendered as well which will allow for the creation of a new employee object and post it to the db
    let empList = await db.getDB();
    // I will use this list for rendering and for the filtered options
    if(currentUser.isOwner()){
        let main = document.querySelector('main');
        main.innerHTML=`
        <h2>Employee Managment</h2>
        <section class="container padd">
            <form class='flex'>
                <div class='form-group'>
                    <label for="dep">Department Filter:</label>
                    <select class="form-control" name='dep' id="dep">
                        <option selected value="no_select">All Departments</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
            </form>
            <button id='filterBtn' class="btnf-nof">Search</button>
        </section>
        `;
        let initList = makeIdNameList(empList);
        main.appendChild(initList);

        let filterBtn = document.querySelector('#filterBtn');
        filterBtn.addEventListener('click', ()=>{
            filterByDepartment(empList);
        });
        // Make Add Employee button which will render a form to add an employee
        let addEmpBtn = document.createElement('button');
        addEmpBtn.innerHTML = 'Add Employee';
        addEmpBtn.classList = 'btnf';
        addEmpBtn.addEventListener('click', ()=>{
            renderAddEmpForm();
        });
        main.appendChild(addEmpBtn);
    }
    if(currentUser.isAdmin() && !currentUser.isOwner()){
        let deptList = [];
        empList.forEach(employee => {
            if(employee.department == currentUser.employee.department){
                deptList.push(employee);
            }
        });
        let main = document.querySelector('main');
        main.innerHTML = '<h2>Employee Managment</h2>';
        let initList = makeIdNameList(deptList);
        main.appendChild(initList);

        // Make Add Employee button which will render a form to add an employee
        let addEmpBtn = document.createElement('button');
        addEmpBtn.innerHTML = 'Add Employee';
        addEmpBtn.classList = 'btnf';
        addEmpBtn.addEventListener('click', ()=>{
            renderAddEmpForm();
        });
        main.appendChild(addEmpBtn);
    }
}

function renderAddEmpForm(){
    let main = document.querySelector('main');
    if(currentUser.isOwner()){
    let initContent =`
    <section class='container'>
        <h2>Hiring Form<h2>
    </section>
    <section class="container padd">
        <form class='flex'>
            <div class='form-group'>
            <label for="firstName">First Name:</label>
            <input class="form-control" name='firstName' id="firstName">
            </div>
            <div class='form-group'>
            <label for="lastName">Last Name:</label>
            <input class="form-control" name='lastName' id="lastName">
            </div>
            <div class='form-group'>
            <label for="department">Department:</label>
            <select class="form-control" name='department' id="department">
                <option value="Accounting">Accounting</option>
                <option value="Shipping">Shipping</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
            </select>
            </div>
            <div class='form-group'>
            <label for="pay">Sallary:</label>
            <input class="form-control" name='pay' id="pay" type="number">
            </div>
            <div class='form-group'>
            <label for="status">Working Status:</label>
            <select class="form-control" name='status' id="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            </div>
            <div class='form-group'>
            <label for="admin">Admin Status:</label>
            <select class="form-control" name='admin' id="admin">
                <option value="Admin">Admin</option>
                <option value="notAdmin" selected>Not Admin</option>
            </select>
            </div>
        </form>
        <button id="commitBtn" class="btnf-nof">Commit Hire</button>
        <button id="backBtn" class="btnf-nof">Cancel</button>
    </section>
    `;
    main.innerHTML = initContent;
    }
    if(currentUser.isAdmin() && !currentUser.isOwner()){
    let initContent =`
    <section class='container'>
        <h2>Hiring Form<h2>
    </section>
    <section class="container padd">
        <form class='flex'>
            <div class='form-group'>
            <label for="firstName">First Name:</label>
            <input class="form-control" name='firstName' id="firstName">
            </div>
            <div class='form-group'>
            <label for="lastName">Last Name:</label>
            <input class="form-control" name='lastName' id="lastName">
            </div>
            <input hidden id="department">
            <input hidden id="admin">
            <div class='form-group'>
            <label for="pay">Sallary:</label>
            <input class="form-control" name='pay' id="pay" type="number">
            </div>
            <div class='form-group'>
            <label for="status">Working Status:</label>
            <select class="form-control" name='status' id="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            </div>
        </form>
        <button id="commitBtn" class="btnf-nof">Commit Hire</button>
        <button id="backBtn" class="btnf-nof">Cancel</button>
    </section>
    `;
    main.innerHTML = initContent;
    document.querySelector('#department').value = currentUser.employee.department;
    document.querySelector('#admin').value = false;
    };

    document.querySelector('#commitBtn').addEventListener('click', ()=>{
        db.addNewEmp();
    });
    document.querySelector('#backBtn').addEventListener('click', ()=>{
        renderEmpMgmtView(currentUser);
    })
}

async function renderThisEmpOptions(e){
    // Get admin data from bd
    let empId = Number(e.target.dataset.id);
    let curEmp = await db.getEmpById(empId);
    
    let position;
    if(curEmp.admin){
        position = 'Admin';
    } else {
        position = 'Employee';
    };
    if(currentUser.isOwner()){
        // Render data
        let main = document.querySelector('main');
        let initContent =`
        <section class='container'>
            <h2>${position} Data<h2>
        </section>
        <section class="container padd">
            <p>Name: ${curEmp.firstName} ${curEmp.lastName}</p>
            <p>ID#: ${curEmp.id}</p>
            <p>Department: ${curEmp.department}</p>
            <p>Salery: $${curEmp.pay}</p>
            <p>Start Date: ${curEmp.startDate}</p>
            <p>Status: ${curEmp.status}</p>
            <p>Email: ${curEmp.userName}</p>
        </section>
        `;
        main.innerHTML = initContent;
        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList = 'btnf';
        editBtn.addEventListener('click', ()=>{
            renderEditForm(curEmp);
        });
        main.appendChild(editBtn);
        let backBtn = document.createElement('button');
        backBtn.innerHTML = 'Back to List';
        backBtn.classList = 'btnf';
        backBtn.addEventListener('click', ()=>{
            renderEmpMgmtView(currentUser);
        })
        main.appendChild(backBtn);
    }
    if(currentUser.isAdmin() && !currentUser.isOwner()){
        if(curEmp.admin){
            await renderAdminData(e);
            return;
        }
        // Render data
        let main = document.querySelector('main');
        let initContent =`
        <section class='container'>
            <h2>${position} Data<h2>
        </section>
        <section class="container padd">
            <p>Name: ${curEmp.firstName} ${curEmp.lastName}</p>
            <p>ID#: ${curEmp.id}</p>
            <p>Department: ${curEmp.department}</p>
            <p>Salery: $${curEmp.pay}</p>
            <p>Start Date: ${curEmp.startDate}</p>
            <p>Status: ${curEmp.status}</p>
            <p>Email: ${curEmp.userName}</p>
        </section>
        `;
        main.innerHTML = initContent;
        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList = 'btnf';
        editBtn.addEventListener('click', ()=>{
            renderEditForm(curEmp);
        });
        main.appendChild(editBtn);
        let backBtn = document.createElement('button');
        backBtn.innerHTML = 'Back to List';
        backBtn.classList = 'btnf';
        backBtn.addEventListener('click', ()=>{
            renderEmpMgmtView(currentUser);
        })
        main.appendChild(backBtn);
    }
}

function renderEditForm(curEmp){
    let main = document.querySelector('main');
    let position;
    if(curEmp.admin){
        position = 'Admin';
    } else {
        position = 'Employee';
    };
    if(currentUser.isOwner()){
        let initContent =`
        <section class='container'>
            <h2>Editing ${position} Data<h2>
        </section>
        <section class="container padd">
            <form class='flex'>
                <div class='form-group'>
                <label for="firstName">First Name:</label>
                <input class="form-control" name='firstName' id="firstName">
                </div>
                <div class='form-group'>
                <label for="lastName">Last Name:</label>
                <input class="form-control" name='lastName' id="lastName">
                </div>
                <div class='form-group'>
                <label for="department">Department:</label>
                <select class="form-control" name='department' id="department">
                    <option value="Accounting">Accounting</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                </select>
                </div>
                <div class='form-group'>
                <label for="pay">Sallary:</label>
                <input class="form-control" name='pay' id="pay" type="number">
                </div>
                <div class='form-group'>
                <label for="status">Working Status:</label>
                <select class="form-control" name='status' id="status">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                </div>
                <div class='form-group'>
                <label for="admin">Admin Status:</label>
                <select class="form-control" name='admin' id="admin">
                    <option value="Admin">Admin</option>
                    <option value="notAdmin">Not Admin</option>
                </select>
                </div>
            </form>
            <button id="commitBtn" class="btnf-nof">Commit Edits</button>
            <button id="backBtn" class="btnf-nof">Go Back</button>
        </section>
        `;
        main.innerHTML = initContent;

        // Manually name data sticky
        document.getElementById("firstName").value = curEmp.firstName;
        document.getElementById('lastName').value = curEmp.lastName;

        // Make default selection for department dropdown list
        let selectList = document.querySelector("#department");
        for(let i = 0; i < selectList.options.length; i++){
            if(selectList.options[i].value == curEmp.department){
                selectList.selectedIndex = i;
                break;
            };
        };

        document.getElementById('pay').value = curEmp.pay;
        
        if(curEmp.status === "Active"){
            document.querySelector('#status').options.selectedIndex = 0;
        } else {
            document.querySelector('#status').options.selectedIndex = 1;
        }

        // Mark default selection for admin status
        if(curEmp.admin){
            document.querySelector('#admin').options.selectedIndex = 0;
        } else {
            document.querySelector('#admin').options.selectedIndex = 1;
        }

        document.querySelector('#commitBtn').addEventListener('click', (e)=>{
            e.preventDefault();
            db.editEmp(curEmp);
        });
        let backBtn = document.querySelector('#backBtn');
        backBtn.dataset.id = curEmp.id;
        backBtn.addEventListener('click', (e)=>{
            renderThisEmpOptions(e);
        });
    }
    if(currentUser.isAdmin() && !currentUser.isOwner()){
        let initContent =`
        <section class='container'>
            <h2>Editing ${position} Data<h2>
        </section>
        <section class="container padd">
            <form class='flex'>
                <div class='form-group'>
                <label for="firstName">First Name:</label>
                <input class="form-control" name='firstName' id="firstName">
                </div>
                <div class='form-group'>
                <label for="lastName">Last Name:</label>
                <input class="form-control" name='lastName' id="lastName">
                </div>
                <input hidden id="department">
                <div class='form-group'>
                <label for="pay">Sallary:</label>
                <input class="form-control" name='pay' id="pay" type="number">
                </div>
                <div class='form-group'>
                <label for="status">Working Status:</label>
                <select class="form-control" name='status' id="status">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                </div>
                <input hidden id="admin" value="false">
            </form>
            <button id="commitBtn" class="btnf-nof">Commit Edits</button>
            <button id="backBtn" class="btnf-nof">Go Back</button>
        </section>
        `;
        main.innerHTML = initContent;

        // Manually name data sticky
        document.getElementById("firstName").value = curEmp.firstName;
        document.getElementById('lastName').value = curEmp.lastName;
        document.getElementById('department').value = curEmp.department;
        document.getElementById('pay').value = curEmp.pay;
        
        if(curEmp.status === "Active"){
            document.querySelector('#status').options.selectedIndex = 0;
        } else {
            document.querySelector('#status').options.selectedIndex = 1;
        }

        document.querySelector('#commitBtn').addEventListener('click', (e)=>{
            e.preventDefault();
            db.editEmp(curEmp);
        });
        let backBtn = document.querySelector('#backBtn');
        backBtn.dataset.id = curEmp.id;
        backBtn.addEventListener('click', (e)=>{
            renderThisEmpOptions(e);
        });
    }
}

export function renderEditOKView(currentUser){
    let main = document.querySelector('main');
    main.innerHTML = `
    <section class="padd">
    <h3>Employee Successfully Added/Edited</h3>
    <br>
    <button id="backBtn" class='btnf'>Back to List</button>
    </section>
    `;
    document.querySelector('#backBtn').addEventListener('click', ()=>{
        renderEmpMgmtView(currentUser);
    });
}

export function renderUserEditOKView(currentUser){
    let main = document.querySelector('main');
    main.innerHTML = `
    <section class="padd">
    <h3>Successfully Changed Password</h3>
    <br>
    <button id="backBtn" class='btnf-nof'>Back to Home</button>
    </section>
    `;
    document.querySelector('#backBtn').addEventListener('click', ()=>{
        renderView(currentUser);
    });
}

function renderActStngsView(currentUser){
    console.log(currentUser);
    let main = document.querySelector('main');
    let initContent =`
    <section class="container">
    <h3>Account Settings</h3>
    </section>
    <section class="container padd">
        <p>Name: ${currentUser.employee.firstName} ${currentUser.employee.lastName}</p>
        <p>ID#: ${currentUser.employee.id}</p>
        <p>Department: ${currentUser.employee.department}</p>
        <p>Salery: $${currentUser.employee.pay}</p>
        <p>Start Date: ${currentUser.employee.startDate}</p>
        <p>Status: ${currentUser.employee.status}</p>
        <p>Email: ${currentUser.employee.userName}</p>
    </section>
    <button id="pswrd" class="btnf">Change Password</button>
    `;
    main.innerHTML = initContent;
    document.querySelector('#pswrd').addEventListener('click', ()=>{
        renderPswrdChangeFourm(currentUser);
    });
}

function renderPswrdChangeFourm(user){
    let main = document.querySelector('main');
    let initCOntent =`
    <br>
    <section class="container padd">
        <form class='flex'>
            <div class='form-group'>
            <label for="password">New Password:</label>
            <input class="form-control" name='password' id="password">
            </div>
        </form>
    </select>
    <button id="commitBtn" class="btnf-nof">Commit Change</button>
    <button id="backBtn" class="btnf-nof">Go Back</button>
    `;
    main.innerHTML = initCOntent;
    document.querySelector('#backBtn').addEventListener('click', ()=>{
        renderActStngsView(currentUser);
    });
    document.querySelector('#commitBtn').addEventListener('click', ()=>{
        db.changePassword(user);
    })
}