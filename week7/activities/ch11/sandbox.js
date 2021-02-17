{
    // Further Functions Sandbox

    // Functions are first class objects in JavaScript, this means they have their own properties and methods and can be passed around
    //like any other object.

    const func = function(a,b,c) {
        return a + b + c;
    }

    console.log("The Date.now method has " + Date.now.length + " possible parameters.");
    console.log("That was a bad example...");
    console.log("The custom func function has " + func.length + " possible parameters.");
}

{
    // Some of the methods that can be used on functions change the way they behave.
    // For example, the call method makes the "this" in a function's body tie to an object that has been passed, so long as it is
    //compatible.

    const func = function() {
        return `I'm ${this.name}`;
    }

    const obj1 = {name: "Bryon"};
    const obj2 = {name: "Marry"};
    const obj3 = {age: 21};

    console.log(func.call(obj1));
    console.log(func.call(obj2));
    // This one should be undefined
    console.log(func.call(obj3));

    // What would happen if we use the call method on a function that doesn't have a "this" in it?

    const func2 = function() {
        return "Nope";
    }

    console.log(func2.call(null));
    // By calling null, it should still work. If the object had a parameter, I could use call but would have to put null
    //before the parameter.
}

{
    // You can also set custom properties on function objects.
    function doop(){
        return "doop";
    }

    doop.description = "A useless function that returns the string 'doop'"
    
    console.log(doop.description);

    // This can be used in more powerful ways, of course. One such way is to set a cache for the function.
    // This would be useful if the task was very resource heavy.
    function square(x){
        square.cache = square.cache || {};
        if (!square.cache[x]) {
        square.cache[x] = x*x;
        }
        return square.cache[x]
    }

    // The function will add the argument as a key in the cache object of the function. It will then save the result as the value.
    // When the function is called with the same argument, it will pull it from the cache object property, saving resources.
    // This isn't a great example of resource intensive tasks, but it shows the caching method well enough.
    console.log(square(5));
    console.log(square.cache);
    // When run again, it will simply call from cache.
    console.log(`${square(5)} "This was returned from the cache, no calculating needed"`);
}

{
    // Immediately invoked function expressions are self calling and self contained functions.
    // They have their own scope that everything inside of is bound to, this makes them useful in modular
    //and team development.
    // It can be noted, however, that ES6 introduced blocks and modules, which do the same thing but in a more organized way.
    // This whole file has been using blocks to separate code sections. Function names have been reused with no errors.
    let a = 5;
    let b = 3;

    (()=>{
        console.log("This was logged on a IIFE");
        const temp = a;
        a = b;
        b = temp;
    })();

    console.log(a);
    console.log(b);
    // This will throw an error, because temp doesn't exist here.
    //console.log(temp);

    // The code above could be redone using ES6's destructuring method.
    [a,b] = [b,a];
    console.log(a);
    console.log(b);

    // IIFEs can also be used as initialization functions. You could use them to set event listeners and stabilize the working
    //environment. See week 6 main.js for example.

    // Safe mode can be activated inside of IFFEs and Blocks without impacting the rest of the code. It is generally a good
    //idea to develop in safe mode by default. If you use a module, you will be in safe mode by default.
}

{
    // Functions can define and rewrite themselves.
    // For example
    function party(){
        console.log('Wow this is amazing!');
        party = function(){
            console.log('Been there, got the T-Shirt');
        }
    }

    party.description = "It's a party!";

    const neverEndingParty = party;

    console.log(party.description);

    // This function will return "Wow this is amazing!" when first called, and "Been there, got the T-Shirt" on every subsequent call.
    party();
    party();

    // When a rewriting function is stored in a variable, the variable will hold the original function definition.

    neverEndingParty();
    neverEndingParty();
    party();

    // If you set a custom property to a function, then redefine it, that property will be lost.
    console.log(party.description);
    // Will it hold on the variable definition?
    console.log(neverEndingParty.description);
    // Yes
    // It seems to save a functions initial state, you need to store it in a variable before it's first call.
    // Can I redefine the function as the original by assigning it to the variable?
    party = neverEndingParty;
    party();
    // Yes
    // Will it change again, or is it set now?
    party();
    // It changed again!
    // This means you can reset functions this way.
    // How could this mechanic be used in a practical way?
    party = neverEndingParty;
    console.log(party.description);
    // The property also reset.
    party();
    console.log(party.description);
    // Expected results.

    // This technique can be used to check if certain APIs are active in the browser. If they are, use the API method
    //if not, use a custom method.
    function ride(){
        if (window.unicorn) { 
            ride = function(){
            // some code that uses the brand new and sparkly unicorn methods
            return 'Riding on a unicorn is the best!';
            }
        } else {
            ride = function(){
            // some code that uses the older pony methods
            return 'Riding on a pony is still pretty good';
            }
        }
        return ride();
    }
}

{
    // "A recursive function is one that invokes itself until a certain condition is met. It’s a useful tool to use when iterative
    //processes are involved. A common example is a function that calculates the factorial of a number:"
    function factorial(n) {
        if (n === 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    // Could this not be done using a do-while or while loop?
    // I suppose it is much easier to write as a self calling function.
    console.log(factorial(9));

    /*function fact(n){
        let result;
        let p = n;
        do{
            if(n === 0){
                p = 1;
            } else {
                p = p - 1;
            }
            result += n * p;
        } while(n>=0);
    }*/
    //console.log(fact(9));
    // That function was improperly written and caused an endless loop...
    // This subject gets crazy but the basic idea is that a function can call itself if it has a valid end point.
    // It works much like a loop in that way.
}

{
    // Callbacks are functions that are passed as arguments in other functions and called inside of the parent function.
    // Where they really shine is in event-driven asynchronous programming, where they can be called once a result is returned
    //asynchronously.

    // Events in Event-driven Asynchronous Programming can be simple DOM events or more complex ones,
    /* completion of file download,
       data retrieval from database,
       other complex tasks...
    */
    function wait(message, callback, seconds){
        setTimeout(callback,seconds * 1000);
        console.log(message);
    }
    function errorHandle(callback){
        setTimeout(callback, 1000);
        console.log('Warning! Development Mode Active!!! Critical Error Handling Mode On!');
    }
    function selfDestruct(){
        console.log('BOOOOM!');
    }
    wait("Database unreachable, resorting to subtle error handler...", () => {errorHandle(selfDestruct);}, 2);
    console.log("Must have gotten the connection string wrong.");
    // JavaScript is single threaded, so operations take time to complete and only work in a lateral way (if callbacks aren't used).
    // Note that the example above uses a callback function inside of a callback function. This pattern can result in what is known
    //as callback hell.
}

{
    // Promises
    //"A promise represents the future result of an asynchronous operation. Promises don't do anything that can't already 
    //be achieved using callbacks, but they help simplify the process, and avoid the convoluted code that can result from 
    //using multiple callbacks."

    // Promises work as follows
    /* Promise created - Calls asynchronous operation.
        Promise pending - remains pending while operation is taking place.
        Promise unsettled - the idle state of a promise being done.
        Promise settled - the process is complete and results in one of two ways
            Resolved - The asynchronous operation completed successfully.
            Rejected - The asynchronous operation didn’t work as expected, wasn't successfully completed or resulted in an error.
    */

    // Promises are made using constructor functions.
    /*const promiseExample = new Promise( (resolve, reject) => {
        // initialization code goes here
        if (success) {
            resolve(value);
        } else {
            reject(error);
        }
    });*/

    // Testing promises
    const dice = {
        sides: 6,
        roll() {
            return Math.floor(this.sides * Math.random()) + 1;
        }
    }

    const promise = new Promise( (resolve,reject) => {
        const n = dice.roll();
        if(n > 1){
            setTimeout(()=>{resolve(n)}, 4000);
        } else {
            setTimeout(()=>reject(n), 4050);
        }
    });

    promise.then( result => console.log(`Sucsess with a ${result}, you lived!`), result => console.log(`Critical fail with a ${result}, you died.`) );
    // Alternative to the second argument in then, you could also use the .catch method.
    // Then handles success, catch handles failure.
    // Promises really shine when you have long chained asynchronous tasks.
    // For example,
    /*login(userName)
    .then(user => getPlayerInfo(user.id))
    .then(info => loadGame(info))
    .catch( throw error)*/

    // Lets look at the async function method.

    async function loadGame(userName) {
        try {
            const user = await login(userName);
            const info = await getPlayerInfo (user.id);
            // load the game using the returned info
        }
        catch (error){
            throw error;
        }
    }
}

{
    // Functions can return functions. To save a returned function, you will have to assign it to a variable.
    function greeter(greeting = 'Hello') {
        return function() {
            console.log(greeting);
        }
    }
    const englishGreeter = greeter();
    englishGreeter();

    const frenchGreeter = greeter('Bonjour');
    frenchGreeter();

    const germanGreeter = greeter('Guten Tag');
    germanGreeter();
}

{
    // Closure functions take advantage of the scope pools of inner functions and allow a way to save the variables of 
    //inactive functions as well.

    function closure() {
        let a = 1.8;
        let b = 32;
        return c => c * a + b;
    }

    const toF = closure();
    // toF is assigned the anonymous function returned in the closure function. Yet, it still has the consts in the closure function
    //as assessable variables stored in memory.
    console.log(toF(32));
    // toF is assigned "c => c * a + b". It still has "memory" of a and b from the original function though.
    
    // Closures allow you to modify the original functions variables as well. This has to be handled within the function itself, though.
    // This will not work.
    toF.a = 2;
    console.log(toF(32));

    function counter(start){
        let i = start;
        return function() {
            // This will modify i in the outer function, even when we assign the inner function to a variable and it's run.
            return i++;
        }
    }

    let count = counter(1);

    console.log(count());
    console.log(count());
    // The outer function's i variable has been modified.

    // Can the count variable be reset?
    count = counter(1);
    console.log(count());
    // So it can be.
}

{
    // Generator functions
    // "ES6 introduced support for generators. These are special functions used to produce iterators that maintain the state of a value."
    /* Generators are defined this way,

        function* exampleGenerator() {
        // code for the generator goes here
        }

    the * is what defines this as a generator function.
    */
   // An example is as such,
   function* fibonacci(a,b) {
        let [ prev,current ] = [ a,b ];
        while(true) {
            [prev, current] = [current, prev + current];
            yield current;
        }
    }
    // Take note of the keywords used in this function
    // Generator functions have a next() method that actually calls them. Without the next() method, they don't do anything.
    const sequence = fibonacci(1,1);
    console.log(sequence.next());
    console.log(sequence.next());
    console.log(sequence.next());
    console.log(sequence.next());
    // It is also possible to iterate over the variable function as many times as needed using a for of loop.
    for (n of sequence) {
        // stop the sequence after it reaches 100
        if (n >= 100) break;
        console.log(n);
    }
    // Note that we are not logging the function call, but the actual value of n now. So it won't log the return object.

    // There is a done key in the object. I wonder if there is a way to set done to true and what that would do.
}

{
    // Functional programming is a complex topic that can be more easily described as a programming paradigm.
    // JavaScript is capable of functional programming practices, as the language supports the core concepts of FP.
    // In order to use JS in a FP way, you must use pure functions.
    // Pure functions do the following,
    /*
        - The return value of a pure function should only depend on the values provided as arguments. 
        It doesn't rely on values from somewhere else in the program.

        - There are no side-effects. A pure function doesn't change any values or data elsewhere in the program. 
        It only makes non-destructive data transformations and returns new values, rather than altering any of the underlying data.

        - Referential transparency. Given the same arguments, a pure function will always return the same result.

        Pure functions must have,

        - At least one argument; otherwise the return value must depend on something other than the arguments of the function, 
        breaking the first rule

        - A return value; otherwise there’s no point in the function (unless it has changed something else in the program – 
        in which case, it’s broken the 'no side-effects' rule).
    */
    // The following is an example of a pure function,
    function reverse(string) {
        return string.split('').reverse().join('');
    }

    const string = "Hello!";

    console.log(reverse(string));
    console.log(string);
    // The original string remains unchanged after the function call.

    // Here is an impure function
    let number = 42;
    let result = 0;
    function impureAdd(x) {
        result = number + x;
    }
    // Note how it depends on inputs from outside it's argument list and has no explicit return.
    // It updates result from outside of the function.

    // A pure function would not do any of that, but rather look like this,
    const number2 = 42;

    function pureAdd(x,y) {
        return x + y;
    }

    result = pureAdd(number2,10);
    console.log(result);
    // The function only uses it's arguments to preform calculations and has a specific return that can be stored in a variable.
    // This function will always return the same result when given the same input arguments.

    // Higher order functions are an essential part of the FP paradigm.
    // They use closures to fulfill their purpose.
    function multiplier(x){
        return function(y){
            return x*y;
        }
    }
    // This is a generic higher order function that will be used to build more specific and useful functions later.

    const doubler = multiplier(2);
    // Now it takes a single argument and preforms a specific task. This is also a pure function.

    const trippler = multiplier(3);
    // This is an example of how the multiplier function can be used to build other functions that follow the FP rules.

    console.log(doubler(10));
    console.log(trippler(10));

    const what = multiplier(2)(5);
    // This works because multiplier(2) returns a function which we immediately give the argument of 5. This is a cheeky way to 
    //work around setting the higher function to a variable, though it isn't preferred.

    console.log(what);
}