//Primary function of this file is to populate the directory list from an array

const links = [
    {
        label: "Week 1 Notes and Activites",
        url: "week1/index.html"
    }
];

//Pull ol from document object and populate it with il elements using the links array as the data source

window.onload = function(){
    var directory = document.getElementById("directory");
    links.forEach(link => {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.innerHTML = link.label;
        a.href = link.url;
        li.appendChild(a);
        directory.appendChild(li);
    });
};
