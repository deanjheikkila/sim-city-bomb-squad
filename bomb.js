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
let wiresToCut = [];


/*------------------Functions-----------------------*/
let gameInit = function() {
    let domWires = document.querySelectorAll('img');
    let domTimer = document.querySelector('.countdown');
    let domResetBtn = document.querySelector('.reset');
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
    console.log(wiresToCut);
    // start countdown
    // play siren
}


let wireClickHandler = function(e) {
    //check if wire has been cut
    if (!wires[e.target.id].cut) {
        wires[e.target.id].cut = true;
        //      change img
        e.target.src = wires[e.target.id].cutImage;
        // check if its in wires to cut
        let wireIndex = wiresToCut.indexOf(e.target.id);
        if (wireIndex > -1) {
            console.log('good so far');
            //take out of wires to cut
            wiresToCut.splice(wireIndex, 1);
            // run checkwin
            checkWin();
        } else {
            // run loser()
            console.log("KABOOM");
            
        }
    //play buzz
    }
};

let checkWin = function() {
    // iterate over wires
        // check to see if needsCut wires are cut
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM References
    
    document.querySelector('.wires').addEventListener('click', wireClickHandler);
    
    gameInit();
});