/*-----------------Game State/Global Variables--------------------*/
let wires = {
    blue: {
        cut: false,
        needsCut: false,
        cutImage: 'img/cut-blue-wire.png',
        uncutImage: 'img/uncut-blue-wire.png',
    },
    green: {
        cut: false,
        needsCut: false,
        cutImage: 'img/cut-green-wire.png',
        uncutImage: 'img/uncut-green-wire.png',
    },
    red: {
        cut: false,
        needsCut: false,
        cutImage: 'img/cut-red-wire.png',
        uncutImage: 'img/uncut-red-wire.png',
    },
    white: {
        cut: false,
        needsCut: false,
        cutImage: 'img/cut-white-wire.png',
        uncutImage: 'img/uncut-white-wire.png',
    },
    yellow: {
        cut: false,
        needsCut: false,
        cutImage: 'img/cut-yellow-wire.png',
        uncutImage: 'img/uncut-yellow-wire.png',
    }
};

const STARTING_TIME = 30;
let remainingTime = STARTING_TIME;
let wiresToCut = [];
let countdown = null; // assigns to null so countdown doesnt start immediately
let delay = null;
let gameOver = true;

/*------------------Functions-----------------------*/
let gameInit = function() {
    let domWires = document.querySelectorAll('img');
    let domTimer = document.querySelector('.countdown');
    let domResetBtn = document.querySelector('.reset');
    gameOver = false;
    wiresToCut = [];
    // reset timer
    remainingTime = STARTING_TIME;
    // reset wire images
    for (let i=0; i< 5; i++){
        domWires[i].src = `img/uncut-${domWires[i].id}-wire.png`;
    }
    // disable button
    domResetBtn.disabled = true;
    // reset background
    document.querySelector('body').classList.remove('flat-city');
    document.querySelector('body').classList.add('happy-city');
    // set wires to be cut
    for (wire in wires) {
        let rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    // TODO: check no win scenarios and re-run wire loop
    console.log(wiresToCut);
    // start countdown
    countdown = setInterval(updateClock, 1000);
    // play siren
}

let endGame = function(win) {
    // check if win
    clearInterval(countdown);
    clearTimeout(delay);
    gameOver = true;
    document.querySelector('.reset').disabled = false;
    if (win) {
        //TODO savior stuff
        console.log("Hurray!");
    } else {
        console.log("KABOOOOOM");
        document.body.classList.remove("happy-city");
        document.body.classList.add("flat-city");
    }
}

let updateClock = function() {
    // TODO: countdown in miliseconds
    // decrease the value of remaining time
    remainingTime--;
    if (remainingTime <= 0) {
        //end game as loser
        endGame(false);
    }
    document.querySelector('.countdown').textContent = `00:00:${remainingTime < 10 ?'0'+remainingTime:remainingTime}`;

}

let wireClickHandler = function(e) {
    //check if wire has been cut and if game is not over
    if (!wires[e.target.id].cut && !gameOver) {
        // tell js we've cut the wire
        wires[e.target.id].cut = true;
        //      change img
        e.target.src = wires[e.target.id].cutImage;
        // check if its in wires to cut
        let wireIndex = wiresToCut.indexOf(e.target.id);
        if (wireIndex > -1) {
            console.log('good so far');
            //take out of wires to cut
            wiresToCut.splice(wireIndex, 1);
            // check if wires to cut.length === 0
            if (wiresToCut.length === 0) {
                endGame(true);
            }
        } else {
            // run loser()
            delay = setTimeout(function () {
                console.log("Yikes, 750ms left");
                endGame(false);
            }, 750);
        }
    //play buzz
    }
};


document.addEventListener('DOMContentLoaded', function() {
    // DOM References
    
    gameInit();
    document.querySelector('.wires').addEventListener('click', wireClickHandler);
    
});