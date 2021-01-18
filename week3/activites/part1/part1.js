// Sandbox for JavaScript objects that use the "this" keyword

let dev = {
    first_name : "Tanner",
    last_name : "Goodale",
    height : `5'10"`,
    expirence : "Novice",

    define(){
        return this;
    },

    defineProps(){
        return this.first_name + " " + this.last_name + " " + this.height + " " + this.expirence;
    },

    fullName(){
        return this.first_name + " " + this.last_name;
    }
};

console.log(dev.define());
console.log(dev.fullName());
console.log(dev.defineProps());

// Output developer info to main page

let p = document.createElement("p");
p.innerHTML = dev.defineProps();
console.log(p);
document.getElementById("sandBox").appendChild(p);
// That didn't work...

//function outputObj(object){
    //let text = document.createTextNode(object.defineProps());
    //document.getElementById("sandBox").appendChild(text);
//}

//outputObj(dev);
// Still no output...

// I deleted more of the play code. It turns out defining the JS file at the top of the page 