//Primary function of this file is to populate the directory list from an array

const links = [
    {
        label: "Week 1 Notes and Activites",
        url: "week1/index.html"
    },
    {
        label: "Week 2 Notes and Activites",
        url: "week2/index.html"
    },
    {
        label: "Week 3 Notes and Activites",
        url: "week3/index.html"
    },
    {
        label: "Week 4 Notes and Activites",
        url: "week4/index.html"
    },
    {
        label: "Week 5 Notes and Activites",
        url: "week5/index.html"
    },
    {
        label: "Week 6 Notes and Activites",
        url: "week6/index.html"
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
