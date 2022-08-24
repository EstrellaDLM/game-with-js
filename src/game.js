const canvas = document.getElementById('game');
const game = canvas.getContext("2d");
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const playerLives = document.getElementById('vidas');
const playerTime = document.getElementById('time');
const record = document.getElementById('record');
const result = document.getElementById('result');
const NewGame= document.getElementById("newGame")
let canvasSize;
let canvasElement;
let timeInterval
let time_playing
const playerDetails = {
    lives: 3,
    timeStart:  undefined,
    timePlaying: undefined,
    render: function () {
        showLives()

        if (!this.timeStart) {
            this.timeStart = Date.now()
            timeInterval = setInterval(showTime, 100)
        }
        showRecord()
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

        if (!maps[this.lvl]) {
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
NewGame.addEventListener("click",newGame)

function newGame(){
    map.lvl=0;
    playerDetails.lives=3
    clearInterval( timeInterval )
    playerDetails.timeStart = undefined
    map.playerPosition.x = undefined
    map.playerPosition.y = undefined
    startGame()

}
function setCanvasSize() {
    window.innerHeight > window.innerWidth
        ? canvasSize = window.innerWidth * 0.7
        : canvasSize = window.innerHeight * 0.7;


    canvas.setAttribute("height", canvasSize)
    canvas.setAttribute("width", canvasSize)
    canvasElement = canvasSize / 10;
    map.playerPosition.x=undefined
    map.playerPosition.y=undefined
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
        if (playerDetails.lives <= 0) {
            map.lvl = 0
            playerDetails.lives = 3
            clearInterval(timeInterval)
            playerDetails.timeStart = undefined
        }
        map.playerPosition.x = undefined
        map.playerPosition.y = undefined
        startGame()
    }

}
function winGame() {
    const record =localStorage.getItem("record")
    if (record===null) {
        console.log("lo lograste")
        result.innerText ="Lo LOGRASTE!!!"
        localStorage.setItem("record", time_playing);
    }
    if (time_playing < localStorage.getItem("record")) {
        localStorage.setItem("record", time_playing);
        result.innerText = "NUEVO RECORD!"
  
    }
    if (time_playing > localStorage.getItem("record")) {
        result.innerText = "Sigue intentandolo noob!"
  
    }
    clearInterval(timeInterval)
    console.log("Ganaste")
}


//Detalles del jugador
function showLives() {
    const lives = Array(playerDetails.lives).fill(emojis["heart"]).join("")
    playerLives.innerText = lives
}
function showTime() {
    time_playing=Date.now() - playerDetails.timeStart
    playerTime.innerHTML = time_playing
}
function showRecord() {
    record.innerText = localStorage.getItem("record")
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
