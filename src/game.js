const canvas = document.getElementById('game');
const game = canvas.getContext("2d");

window.addEventListener('load',startGame);

function startGame() {
//  game.fillRect(50,20,55,77);
//  game.clearRect(0, 0, 100, 100);
//  console.log(canvas.width, canvas.height);
//  game.font= "20px sans-serif";
//  game.fillStyle= "purple";
//  game.textAlign = "center"; //left|right|
//  game.fillText("platzi",50,50);
//  console.log(canvas)
//  console.log(game)

let canvasSize;
//Con esta condicion podemos verificar el tamaño de la pantalla y luego agregar un valor especifico al lado de mi cavas, como queremos
if (window.innerHeight>window.innerWidth){
    canvasSize = window.innerWidth * 0.9;
    
}else{
    canvasSize = window.innerHeight * 0.7;
    
}
//le agrego las propiedades a mi canvas
canvas.setAttribute("height", canvasSize)
canvas.setAttribute("width", canvasSize)
//como queremos una grilla de 10 x 10
//voy a definir el tamaño de mi elemento, 10 veces menor que la el tamano original del canvas
const canvasElement=canvasSize/10;
//ahora le doy el tamaño del elemento del canvas
game.font= canvasElement+"px Verdana"
// y digo que los elementos van a estar ordenados a lado izquierdo del punto
game.textAlign="end"
//como un emoji es texto, podemos usar el objeto que teniamos guardado y asi trer lo que queramos, en este caso buscamos el emoji de la bomba

//Entonces como queremos emprimir la bomba más de una vez, usamos un ciclo for
for(let i=1;i<=10;i++){

    game.fillText(emojis['X'], canvasElement*i, canvasElement)
}


}