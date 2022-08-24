const canvas = document.getElementById('game');
const game = canvas.getContext("2d");
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down')
const playerLives =document.getElementById('vidas')
let canvasSize;
let canvasElement;
// let lives=3;
const playerDetails={
    lives:3,
    render: function(){
        livesPlayes()
    }
}
const map = {
    lvl: 0,

    playerPosition: {
        x: undefined,
        y: undefined,
        render: function () {
            game.fillText(emojis["PLAYER"], this.y, this.x);
            const coincideX = Math.floor(this.x) === Math.floor(map.giftPosition.x);
            const coincideY = Math.floor(this.y) === Math.floor(map.giftPosition.y);

            
            if (coincideY && coincideX) {
                console.log("Subiste de nivel")
                lvlUp()
            }
            
            resetGame()
        }

    },
    giftPosition: {
        x: undefined,
        y: undefined,
    },
    bombPosition: [],
    render: function () {

        if(!maps[this.lvl]){
            winGame()
            return
        }
        const Map = maps[this.lvl].match(/[IXO\-]+/g)
            .map(a => a.split("")) || console.log("No more maps")
        
        game.font = canvasElement + "px Verdana"
        game.textAlign = "end"
        game.clearRect(0, 0, canvasSize, canvasSize)
        Map.forEach((x, xi) => {
            x.forEach((y, yi) => {
                const posX = canvasElement * (xi + 1)
                const posY = canvasElement * (yi + 1)
                game.fillText(emojis[y], posY, posX)

                if (y === "O") {
                    if (this.playerPosition.x === undefined && this.playerPosition.y === undefined) {
                        this.playerPosition.x = posX
                        this.playerPosition.y = posY

                    }
                }
                if (y === "I") {
                    this.giftPosition.x = posX
                    this.giftPosition.y = posY
                }
                if (y === "X") {
                    this.bombPosition.push({ x: posX, y: posY })
                }


            })
        })
        this.playerPosition.render()
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
    map.bombPosition = []
    map.render()
    playerDetails.render()

}
function lvlUp() {
    map.lvl += 1;
    startGame()

}
function colision() {
    const enemyColition = map.bombPosition.find(a => {
        const coincideX = map.playerPosition.x.toFixed(3) === a.x.toFixed(3);
        const coincideY = map.playerPosition.y.toFixed(3) === a.y.toFixed(3);
        return coincideY && coincideX
    })


    if (enemyColition) {
        console.log("perdiste")
    }
    return enemyColition

}
function resetGame() {
   
    if (colision()) {
        playerDetails.lives--;
        if(playerDetails.lives<=0){
            map.lvl=0
            playerDetails.lives=3
        }
        map.playerPosition.x = undefined
        map.playerPosition.y = undefined
        startGame()
    }

}
function winGame(){
    console.log("Ganaste")
}
//Detalles del jugador
function livesPlayes(){
   const lives =Array(playerDetails.lives).fill(emojis["heart"])
   playerLives.innerText=""
   lives.forEach(a=>playerLives.append(a))
}

//moviemientos
window.addEventListener("keyup", moveByKey)
btnUp.addEventListener("click", moveUp)
btnLeft.addEventListener("click", moveLeft)
btnRight.addEventListener("click", moveRight)
btnDown.addEventListener("click", moveDown)

function moveUp() {
    map.playerPosition.x - canvasElement < canvasElement
        ? map.playerPosition.x = canvasElement
        : map.playerPosition.x -= canvasElement

    startGame()
}
function moveLeft() {
    map.playerPosition.y - canvasElement < canvasElement
        ? map.playerPosition.y = canvasElement
        : map.playerPosition.y -= canvasElement
    startGame()
}
function moveRight() {
    map.playerPosition.y + canvasElement > canvasSize
        ? map.playerPosition.y = canvasSize
        : map.playerPosition.y += canvasElement
    startGame()
}
function moveDown() {
    map.playerPosition.x + canvasElement > canvasSize
        ? map.playerPosition.x = canvasSize
        : map.playerPosition.x += canvasElement
    startGame()
}
function moveByKey(event) {

    if (event.key === "ArrowUp") moveUp();
    if (event.key === "ArrowLeft") moveLeft();
    if (event.key === "ArrowRight") moveRight();
    if (event.key === "ArrowDown") moveDown();

}
