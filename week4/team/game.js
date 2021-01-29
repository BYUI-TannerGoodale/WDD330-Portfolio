// Game logic for tic-tac-toe game

/**** Objective,
 * - Assign events to mark an X or an O depending on which player's turn it is
 * - Toggle to change which player's turn it is on each valid press
 * - Make reset function for button to reset board when pressed
*/

// Define player 1 and player 2 and make a way to toggle between the two
// Should they be player objects or should it be a simple variable that defines if X or O should be marked?

let playerMark = "X";
// This will be toggled to "O" when a valid press event is fired on the board and then back to "X" on the next valid press.

// Add a touchend event to the game board
document.getElementById("container").addEventListener('touchend', mark);

function mark(event){
    // Make sure the target's innerHTML is empty before setting value
    if(event.target.innerHTML.length == 0){
        event.target.innerHTML = playerMark;
    } else {
        alert("You can not change another player's mark!");
        return;
    }
    // Toggle playerMark with each call of this function
    playerMark = (playerMark === "X") ? "O" : "X";
};

// Add touchend event to reset button
document.querySelector("button").addEventListener('touchend', reset);

// Iterate through all squares and set their value to ""
function reset(){
    let squares = document.querySelectorAll(".square");
    for(i = 0; i < squares.length; i++){
        squares[i].innerHTML = "";
        // This also sets the innerHTML.length to 0
    }
};

console.log("A graphical glitch causes the boxes to render incorrectly for the first second after loading.");
console.log("Due to the use of touchend rather than click, the app only works on mobile enviornments. Please use dev tool's mobile emulator if on desktop.");