const canvas = document.getElementById('game');
const game = canvas.getContext("2d");
let canvasSize;
let canvasElement;

//creo un objeto literal del mapa, y agrego una propiedad que es el nivel y otra que es una funcion render
const map={
    lvl:0,
    render:function () {
        if(this.lvl>=maps.length){
            return console.log ("Ese mapa no existe")
        }
        // Encontramos el mapa y lo preparamos como queremos
        const Map = maps[this.lvl].match(/[IXO\-]+/g)
            .map(a => a.split(""))
        //  le configuramos las propeidades de los elementos que vamos a dibujar
        game.font = canvasElement + "px Verdana"
        game.textAlign = "end"
        // recorremos el mapa para poder obtener las coordenadas de cada una de las posiciones que necesitamos
        Map.forEach((x, xi) => {
        x.forEach((y, yi) => {
            const posX = canvasElement * (xi + 1)
            const posY = canvasElement * (yi + 1)
            game.fillText(emojis[y], posY, posX)
        })
    })
    }
}

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
    map.lvl=1
    map.render()

}
