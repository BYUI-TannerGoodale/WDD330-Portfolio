// Starwars API

const baseURL = new URL("https://swapi.dev/api/people/?page=1");
const baseURLBack = new URL("https://swapi.dev/api/people/?page=1");
let setting = document.getElementById("spot");

function populateList(){

    fetch(baseURL)
    .then(responce => responce.json())
    .then ((data) => {
        const names = data.results.map(user => {
            baseURL.href = data.next;
            baseURLBack.href.replace(/(\d+)+/g, function(number) {
                return parseInt(number)-1});
            return `<p class="getDetails" onclick="getDetails()" >${user.name}</p>`;
        }).join('');
        setting.innerHTML = names;
        let BackBtn = document.createElement("button");
        BackBtn.innerHTML = "Back";
        BackBtn.addEventListener("click", backList);
        setting.appendChild(BackBtn);
        let nextBtn = document.createElement("button");
        nextBtn.innerHTML = "Next";
        nextBtn.addEventListener("click", populateList);
        setting.appendChild(nextBtn);
    });

};

populateList();

function getDetails(){
    let currentTarget = event.target.textContent;
    fetch(baseURL)
        .then((res) => res.json())
         .then ((data) => {            
           const names = data.results.map(user => {
               if(currentTarget == user.name){
                return `
                    <p><b>Name:</b> ${user.name}</p>
                    <p><b>Height: </b>${user.height}</p>
                    <p><b>Hair Color:</b> ${user.hair_color}</p>
                    <p><b>Skin Color:</b> ${user.skin_color}</p>
                    <p><b>Eye Color:</b> ${user.eye_color}</p>
                    <p><b>Birth Year:</b> ${user.birth_year}</p>
                    <p><b>Gender: ${user.gender}</p>
                    <button onclick="populateList()">Back</button>
                `
               }
           }).join('');
           document.getElementById('spot').innerHTML = names;
         })
};

function backList(){
    fetch(baseURLBack)
    .then(responce => responce.json())
    .then ((data) => {
        const names = data.results.map(user => {
            baseURL.href = data.next;

            return `<p class="getDetails" onclick="getDetails()" >${user.name}</p>`;
        }).join('');
        setting.innerHTML = names;
        let BackBtn = document.createElement("button");
        BackBtn.innerHTML = "Back";
        BackBtn.addEventListener("click", populateList);
        setting.appendChild(BackBtn);
        let nextBtn = document.createElement("button");
        nextBtn.innerHTML = "Next";
        nextBtn.addEventListener("click", populateList);
        setting.appendChild(nextBtn);
    });
};