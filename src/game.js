const canvas = document.getElementById('game');
const game = canvas.getContext("2d");
let canvasSize;
let canvasElement;

//Ahora vamos a sustituir la funcion que se esta llamando, por la de setCanvasSize(), pues asi siempre se va a cargar el juego o el tamaño dependiendo del tamaño de la pagina, y tambien premos llmar otras funciones que se ejecuten, en este caso sera en   mismo juego 
window.addEventListener('load', setCanvasSize);

window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.9;

    } else {
        canvasSize = window.innerHeight * 0.7;

    }
    canvas.setAttribute("height", canvasSize)
    canvas.setAttribute("width", canvasSize)
    canvasElement = canvasSize / 10;
    startGame()
}
function startGame() {
    const map = maps[0].match(/[IXO\-]+/g)
    .map(a=>a.split(""))
    console.log(map)
    game.font = canvasElement + "px Verdana"
    game.textAlign = "end"
    for (let x = 1; x <= 10; x++) {
        for (let y = 1; y <= 10; y++) {
            game.fillText(emojis[map[x-1][y-1]], canvasElement*y, canvasElement*x)
        }
    }


}
// Cree una funcion donde simplemente estamos empaquetando los tamaños de nuestro canvas 
