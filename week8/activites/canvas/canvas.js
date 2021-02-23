(()=>{
let c1 = document.getElementById("c1");
let context = c1.getContext("2d");
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);
})();

(()=>{
let c1 = document.getElementById("c1");
let context = c1.getContext("2d");
context.strokeStyle = "Black";
var gradient = context.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "blue"); 
gradient.addColorStop(1, "white"); 
context.fillStyle = gradient; 
context.fillRect(110, 110, 50, 50); 
context.strokeRect(110, 110, 50, 50);
})();

window.addEventListener("load", drawImageToCanvasThenMakeHalfBW, false);

function drawImageToCanvasThenMakeHalfBW() {
    let c3 = document.getElementById("c3");
    let context = c3.getContext("2d");
    let img = document.getElementById("img");
    context.drawImage(img, 37, 37);
    var imageData = context.getImageData(0, 0, 100, 200);

    var red, green, blue, greyscale;
    
    for (var i = 0; i < imageData.data.length; i += 4) {
    red = imageData.data[i];
    green = imageData.data[i + 1];
    blue = imageData.data[i + 2];

    grayscale = red * 0.3 + green * 0.59 + blue * 0.11;

    imageData.data[i] = grayscale; 
    imageData.data[i + 1] = grayscale;  
    imageData.data[i + 2] = grayscale;
    }
    context.putImageData(imageData, 0, 0);
    console.log("Wow, that actually worked.")
};

function drawCircle(canvas, x, y, radius, strokeColor, fillColor, lineWidth){
    let context = canvas.getContext("2d");
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = strokeColor;
    context.fillStyle = fillColor;
    context.lineWidth = lineWidth;
    context.fill(); 
    context.stroke();
}

(()=>{
let c2 = document.getElementById("c2");
drawCircle(c2, 100, 100, 70, "black", "purple", 1);
})();