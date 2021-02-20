// localStorage helpers for application

export function readFromLS(type){
    return JSON.parse(localStorage.getItem(type));
}

export function saveToLS(type, arr){
    localStorage.setItem(type, JSON.stringify(arr));
}