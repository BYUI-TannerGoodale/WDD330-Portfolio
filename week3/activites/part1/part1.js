// Sandbox for JavaScript objects and the use of the "this" keyword

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
// That didn't work... (Corection: It did work, I just formated my HTML file incorrectly.)

//function outputObj(object){
    //let text = document.createTextNode(object.defineProps());
    //document.getElementById("sandBox").appendChild(text);
//}

//outputObj(dev);
// Still no output...

// I deleted more of the play code. It turns out defining the JS file at the top of the page was creating the error.

// Method chaining w/ this
let ladder = {
    step : 0,
    name : "Bob",
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    // Returning the object at the end of the method allows us to run a method again without redefining the object.
    showStep : function() // Defined with function expresion
    {
        console.log(this.step);
    }
};

ladder.up().up().up().down().up().up();

console.log(ladder.step);

// Tryng to make two objects with the same "this" using method
function sayName(){
    return this.name;
}

//ladder.sayName = sayName();
//dev.sayName = sayName();

//console.log(ladder.sayName());
//console.log(dev.sayName());
// This fails to work

ladder.sayName = sayName;
dev.sayName = sayName;

console.log(ladder.sayName);
console.log(dev.sayName);
// Did not return wanted results

console.log(ladder.sayName());
console.log(dev.sayName());
// ladder returns bob and dev returns undefined because there is no "name" property.
// Lets see if we can add name and make it work.

dev.name = "Tanner Goodale";
console.log(dev.sayName());
// This works. We can use the same method in both objects. "this" refers to the object calling the method in this case.

// Lets iterate through the dev object and output a p tag for every property in it.
function outPutDev(){
    Object.values(dev).forEach(value => {
        let p = document.createElement("p");
        p.innerHTML = value;
        document.getElementById("sandBox").appendChild(p);
    });
};

outPutDev();

// Lets rewrite that function to work with any object.
function displayObj(obj){
    Object.values(obj).forEach(value => {
        let p = document.createElement("p");
        p.innerHTML = value;
        document.getElementById("sandBox").appendChild(p);
    });
};
// Now lets run thos new function with the ladder object.
displayObj(ladder);

// That was fun.

// Lets use the symbol type and see what breaks it
const realName = Symbol('real name');

const ashlee = {};

ashlee[realName] = "Ashlee Goodale";

console.log(ashlee.realName);
// Returns undefined
console.log(ashlee[realName]);
// Returns Ashlee Goodale

const vast = {
    [realName] : "James Preston"
};

console.log(vast[realName]);

// Lets make an object that tries to use the symbol twise

const bex = {
    [realName] : "Miranda Saxon",
    [realName] : "Sarah Saxon"
};

console.log(bex[realName]);
// Miranda got overwritten by Sarah.

// Lets try again but with a regular string property instread

const rain = {
    [realName] : "Miranda Saxon",
    realName : "Rain",
    fakeName : "Rain"
};

console.log(rain[realName]);
console.log(rain.realName);
// It seems that the symbol and dot notaion of rain's "real name" are different values. This must be how properties are enforced with symbols.

// Lets check to see if a property can be evaluated with a symbol.
//console.log("Rain has a real name: " + [realName] in rain);
// Symbols can not be converted into a string. Lets try just calling the symbol with the check.
//console.log([realName] in rain);
// The same error. I'm sure it works, it just can't be made into a string. Let's try calling the bool from a variable.
//let x = [realName] in rain;
//console.log(x);
// Negative, symbols can not be converted into strings or used in any way that treats it like one.
//console.log("Rain has a real name: " + realName in rain);
// Even this method tries to pull from the symbol. It makes sense, without the dot notation in front of realName, it's refering to the symbol.
console.log("Rain has a fake name: " + 'fakeName' in rain);
// The console did not log the string portion nor did it return true, though fakeName is in the rain object.
console.log(rain.fakeName !== undefined);
// This should come back as true. It did.
// Lets try the hasOwnProperty() method.
console.log(rain.hasOwnProperty('fakeName'));
// This came back true. Lets try this method with the symbol
//console.log(rain.hasOwnProperty([realName]));
// Can not convert symbol value to string...
// Lets try something else
//console.log(rain[realName] !== undefined);
// Even this failed to work. How would you check to see if a symbol is defined in the object then?

// Lets try looping through the object and see what we get
for (const key in rain) {
    console.log(key + ": " + rain[key]);
};
// Intrestingly, the symbol property was ignored. This makes me want to use the normal string property name until symbol has time to mature.

// Lets do something fun and make rpg dice and roll them.
const d4 = {
    sides : 4,
    roll(){
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

const d6 = {
    sides : 6,
    roll(){
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

const d8 = {
    sides : 8,
    roll(){
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

const d10 = {
    sides : 10,
    roll(){
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

const d12 = {
    sides : 12,
    roll(){
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

console.log("These rolls will always be random when you refresh the page");
console.log("Roll the d4 : " + d4.roll());
console.log("Roll the d6 : " + d6.roll());
console.log("Roll the d8 : " + d8.roll());
console.log("Roll the d10 : " + d10.roll());
console.log("Roll the d12 : " + d12.roll());

// This could be used to make some fun game features. I wonder how hard it would be to make a text driven rpg with JavaScript and html.
// It might work better on a terminal application actually.

console.log(Math.abs(-2.1374));
// This is a nice little feature I didn't know about. I'll be using this in the future.

// Lets test our regexp from the notes...
let exp = new RegExp('^[A-Z][a-z]*\D$');
console.log(exp.test('Fish'));
// It comes back false, which is odd because it should work for this. Maybe I defined it incorrectly.
let regWord = /^[A-Z][a-z]*\D$/;
console.log(regWord.test("Fish"));
// This time it came back true, as expected. I might just stick with regex litrials then.
// Lets try to get the other method working properly
let exp2 = new RegExp(/^[A-Z][a-z]*\D$/);
console.log(exp2.test("Hello"));
// This method workd. It seems the whole use a string to define it thing isn't quite up to par.

// Playing aroud with this binding

function showThis(){
    return this;
};

const objObj = {
    name : "Object Man",
    age : 42,
    status: "Unknown",
    clasification: "Euclid",
    scpDesignation : "scp-7243"
};

const showObjObj = showThis.bind(objObj);

console.log(showObjObj());
// Lets try to use the function in a different object

const notObjObj = {
    name: "Not ObjObj, stop asking!",
    age: 42,
    status: "Stuck in hole",
    clasification: "Safe",
    scpDesignation: "scp-7243"
};

const dontShowObjObj = showThis.bind(notObjObj);

console.log(dontShowObjObj());
// It worked as expected. I suppose what it's doing is forcing this in the context of the variable to be assigned to the object eing passed.
