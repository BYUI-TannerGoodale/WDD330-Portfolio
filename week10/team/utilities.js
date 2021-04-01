// Functional utilities

// Fetch and return as JSON
export function getJSON(url){
    return fetch(url)
    .then((responce)=>{
        if(responce.ok){
            return responce.json();
        } else {
            throw Error(responce.statusText);
        }
    })
    .catch((err)=>{
        console.log(err); // Error handling will be modified as needed later
    })
};

export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};