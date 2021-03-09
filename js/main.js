//Primary function of this file is to populate the directory list from an array

const links = [
    {
        label: "Week 1 Notes and Activities",
        url: "week1/index.html"
    },
    {
        label: "Week 2 Notes and Activities",
        url: "week2/index.html"
    },
    {
        label: "Week 3 Notes and Activities",
        url: "week3/index.html"
    },
    {
        label: "Week 4 Notes and Activities",
        url: "week4/index.html"
    },
    {
        label: "Week 5 Notes and Activities",
        url: "week5/index.html"
    },
    {
        label: "Week 6 Notes and Activities",
        url: "week6/index.html"
    },
    {
        label: "Week 7 Notes and Activities",
        url: "week7/index.html"
    }
];

const linksBlock2 = [
    {
        label: "Week 8 Notes and Activities",
        url: "week8/index.html"
    },
    {
        label: "Week 9 Notes and Activities",
        url: "week9/index.html"
    },
    {
        label: "Week 10 Notes and Activities",
        url: "week10/index.html"
    }
];

//Pull ol from document object and populate it with il elements using the links array as the data source

(()=>{
    const directory = document.getElementById("directory");

    links.forEach(link => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = link.label;
        a.href = link.url;
        li.appendChild(a);
        directory.appendChild(li);
    });

    const directory2 = document.getElementById("directory2");

    linksBlock2.forEach(link => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = link.label;
        a.href = link.url;
        li.appendChild(a);
        directory2.appendChild(li);
    });
})();
