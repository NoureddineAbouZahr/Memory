let game = {
    active: false,
    allowClick:false,
    squence: [randomIndex()],
    record: [],
}
var txt = document.getElementById("txt");
const DELAY_BETWEEN_CLICK = 500;
// start 
var squares = document.getElementsByClassName('square');
var sounds = document.querySelectorAll('audio');
var loseSound=document.getElementById("lose ")

for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    const audio = sounds[i];

    square.addEventListener('mousedown', function () {
        if (game.active  && game.allowClick) {
            square.classList.add('active');
        }
    })
    square.addEventListener('mouseup', function () {
        if (game.active && game.allowClick) {
            square.classList.remove('active');
            audio.play();
            game.record.push(i);
            if (!game.squence.toString().startsWith(game.record.toString())) {
                gameOver();
                return;
            }
            if (game.record.length == game.squence.length) {
                setTimeout(() => {
                    addSquenceTimeStamp();
                    playSequenceBot();
                    game.record = [];
                    
                }, DELAY_BETWEEN_CLICK);
            }
        }
    })
}
// end
document.body.addEventListener('keyup', start);
// document.body.addEventListener('mouseup', start);
function start() {
    if (game.active) return;
    txt.innerText = "Level 1";

    game.active = true;
    playSequenceBot();
}
Array.prototype.last = function() {
    return this[this.length-1];
}
function playSequenceBot() {
    if (game.squence.length == 0) return;
    game.allowClick = false;

    squares[game.squence.last()].classList.add('active');
    sounds[game.squence.last()].play();
    setTimeout(() => {
        squares[game.squence.last()].classList.remove('active');
        game.allowClick = true;
    }, DELAY_BETWEEN_CLICK);
}


function addSquenceTimeStamp(){
    txt.innerText = "Level " + (game.squence.length+1) ;
    let squence = game.squence;

    squence.push(randomIndex());
    while(squence.length > 1 && squence[squence.length-1] == squence[squence.length-2]) {
        squence[squence.length-1] = randomIndex();
    }
}
function randomIndex(){
    return Math.round(Math.random()*3)
}
function gameOver(){
    game = {
        active: false,
        allowClick:false,
        squence: [randomIndex()],
        record: [],
    }

    document.body.classList.add('lose');
    setTimeout(() => {
        document.body.classList.remove('lose');
    }, 800);
    txt.innerText="Game Over, press any key to restart!"
    
        lose.play()
    
}