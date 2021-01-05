//Primary function of this file is to populate the directory list from an array

const links = [
    {
        label: "Week1 Notes",
        url: "week1/index.html"
    }
];

console.log(links.length);

//Pull ol from document object and populate it with il elements using the links array as the data scourse

window.onload = function(directory){
    var directory = document.getElementById("directory");
    links.forEach(link => {
        var li = document.createElement("li");
        li.value = link.label;
        li.href = link.url;
        directory.appendChild(li);
    });
};
