const canvas = document.getElementById('game');
const game = canvas.getContext("2d");
let canvasSize;
let canvasElement;

//cree una clase para los mapas, con una propiedad que indica el lvl y una funcion que lo renderiza
class Map {
    constructor(){
        this.lvl=0
    }
    render() {
        if(this.lvl>=maps.length){
            return console.log ("Ese mapa no existe")
        }
        const map =maps[this.lvl].match(/[IXO\-]+/g)
            .map(a => a.split(""))
        game.font = canvasElement + "px Verdana"
        game.textAlign = "end"
        map.forEach((x, xi) => {

        x.forEach((y, yi) => {
            const posX = canvasElement * (xi + 1)
            const posY = canvasElement * (yi + 1)
            game.fillText(emojis[y], posY, posX)
        })
    })
    }
}
const map = new Map()

// const map={
//     lvl:0,
//     render:function () {
//         if(this.lvl>=maps.length){
//             return console.log ("Ese mapa no existe")
//         }
//         console.log(this.lvl)
//         const Map = maps[this.lvl].match(/[IXO\-]+/g)
//             .map(a => a.split(""))
           
//         game.font = canvasElement + "px Verdana"
//         game.textAlign = "end"
//         Map.forEach((x, xi) => {

//         x.forEach((y, yi) => {
//             const posX = canvasElement * (xi + 1)
//             const posY = canvasElement * (yi + 1)
//             game.fillText(emojis[y], posY, posX)
//         })
//     })
//     }
// }
// console.log(map())
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)


function setCanvasSize() {

    window.innerHeight > window.innerWidth
        ? canvasSize = window.innerWidth * 0.9
        : canvasSize = window.innerHeight * 0.7;


    canvas.setAttribute("height", canvasSize)
    canvas.setAttribute("width", canvasSize)
    canvasElement = canvasSize / 10;
    startGame()
}

function startGame() {
    map.lvl=0
    map.render()

}
