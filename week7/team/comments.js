import * as ls from './lsHelpers.js';

// Create class and add a key property to the constructor function.
// Key property will work as primary property for class, a method will be used to create a comment object.
// Use key "this.type" property as key in localStorage and the results of comment creation method as value.
// Class will need to handle basic rendering and filtering methods (maybe do this in a localStorage helper module?).

// All comments will render on from page.
// Comments relative to the hike selected will render on hike screen.
// When looking at a hike screen, a user will be able to add a comment about that hike.

// Model is comment objects in localStorage

// Controller
export default class Comments {
    // Constructor assigns type to object instance and has a Comments property for all comments of this.type
    constructor(type) {
      this.type = type;
      // readFromLS will return an array. If the function can not return anything, create a blank array.
      this.Comments = ls.readFromLS(this.type) || [];
      this.inputFrom = document.getElementById("formish");
    }
    // Comment creation
    newComment(locationName, comment){ // Impure function, consider refracturing
        if(comment.length === 0){
            return alert("You must add text to your review."); // Quick and dirty way of doing this, refractor without popup.
        }
        const newComment = {
            name: locationName,
            date: new Date(),
            content: comment
        };
        // Once comment is created, add it to the comments array.
        this.Comments.push(newComment);
        // Save updated array into localStorage
        ls.saveToLS(this.type, this.Comments)
    }
    // Get comments
    getComments(query){ // getComments will either return all comments for the object type, or filter by type and name by using
                        // a query object.
        let parent = document.getElementById("comment-section");
        parent.innerHTML = "";
        if(query === null){
            this.Comments.forEach(comment => {
                parent.appendChild(renderComment(comment));
            });
        } else {
        filterComments(query);
        }
    }
}

// filter and render functions
function filterComments(query){
    let parent = document.getElementById("comment-section");
    let type = query.type;
    let name = query.name;
    let comments = [];
    if(ls.readFromLS(type)){
        comments = ls.readFromLS(type).filter(c => c.name == name);
    }
    comments.forEach(comment => {
        parent.appendChild(renderComment(comment));
    });
}

function renderComment(comment){
    let div = document.createElement("div");
    let dateString = comment.date.toString().substr(0, 10);
    div.className = "commentBlock";
    div.dataset.id = comment.date;
    div.innerHTML = `
    <span>Review for ${comment.name}</span>
    <span>given on ${dateString}</span>
    <p>- ${comment.content}</p>
    `;
    return div;
}