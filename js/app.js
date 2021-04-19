/*
    Against All Odds - Milestone 2 for Code Institute
    Created using vanilla JavaScript and HTML Canvas
*/

import { random, randomBackground, removeObjectFromArray, numberWithCommas } from './utils.js';

 
//  ***     Canvas setup & background       ***

const canvas = document.getElementById('canvas'); //defining canvas element
const ctx = canvas.getContext('2d'); //defining whether using a 2D or 3D canvas

canvas.width = window.innerWidth - 100; //setting canvas width to match viewport width
canvas.height = window.innerHeight - 100; ////setting canvas height to match viewport height

const BG = {//defining background co-ordinates to match canvas size
    x: 0, 
    y: 0,
    width: canvas.width,
    height: canvas.height
}; 

//array of background image locations used for customisation
const backgroundArr = ['sprites/stars.jpg', 'sprites/stars1.jpg', 'sprites/stars2.jpg', 'sprites/stars3.jpg', 'sprites/stars4.jpg', 'nebula01.jpg', 'nebula02.jpg'];

//set as background file location found in local storage OR as default
let customBG = localStorage.getItem('background#') || backgroundArr[0];

const _background = new Image(); //create new background variable of type Image 
_background.src = customBG; //add file path for background

const drawBackground = () => { //draws background on the canvas
    ctx.drawImage(_background, BG.x, BG.y, BG.width, BG.height);
};


//  ***     Mouse Control Set Up        ***

let canvasPosition = canvas.getBoundingClientRect(); //calculating canvas size relative to viewport

const mouse = { //set mouse co-ordinates on application start
    x: canvas.width / 2,
    y: canvas.height / 2,
};

const moveHandler = (e) => { //tracks user's mouse input
    let relX = e.x - canvasPosition.left;

    if(relX > 0 && relX < canvas.width){
        mouse.x = event.x - canvasPosition.left;
        mouse.y = event.y - canvasPosition.top;
    }
};

canvas.addEventListener("mousemove", moveHandler, false);
canvas.addEventListener("touchmove", moveHandler, false);


//  ***     Defining HTML elements as JS variables      ***
const scoreElement = document.getElementById('scoreElement');
const modal = document.getElementById('modal');
const modalScore = document.getElementById('modalScore');
const highScoreLabel = document.getElementById('highScoreLabel');
const multiplierElement = document.getElementById('multiplierElement');
const highscoreElement = document.getElementById('highscoreElement');
const deathInfo = document.getElementById('deathInfo');
const speedSlider = document.getElementById('speedSlider');
const difficultyElem = document.getElementById('difficulty');
const speedOutput = document.getElementById('speedOutput');
const iplayer = document.getElementById('iplayer');
const tutorial = document.getElementById('tutorial');
const mobileStart = document.getElementById('mobileStart');

let difficulty; //stores difficulty
let isMobile = false;
let isTablet = false;

const checkDevice = () => {
    if(window.screen.width > 479 && window.screen.width < 767){
        isTablet = true; //checking for tablet
    }
    if(window.screen.width < 479){
        isMobile = true; //checking for mobile
    }
};

const gameMode = (diff) => {
    //displays difficulty to the user at start screen
    switch(diff){
            case "4":
                speedOutput.innerHTML = "Amateur";
            break;
            case "5":
                speedOutput.innerHTML = "Semi-Pro";
            break;
            case "6":
                speedOutput.innerHTML = "Professional";
            break;
            case "7":
                speedOutput.innerHTML = "Veteran";
            break;
            case "8":
                speedOutput.innerHTML = "Legendary";
            break;    
            case "9":
                speedOutput.innerHTML = "God Mode";
            break;
        }
};

speedSlider.addEventListener('change', () => { //check for user interaction with difficulty slider
    difficulty = speedSlider.value; //sets chosen difficulty 
    localStorage.setItem('localDifficulty', difficulty); //saves new difficulty to local storage
    gameMode(difficulty); //displays difficulty to the user
}); 

let hue = 0; //used in conjunction with requestionAnimationFrame to create hsl color change effect
let menuActive = true; //tracks whether startscreen is active
let gameOver = false; //tracks whether player has been killed by enemy
let killedByMine1 = false; //tracks which mine killed player
let killedByMine2 = false; //1 (top) 2 (bottom)
let gameFrame = 0; //tracks number of frames that pass
let score = 0; //user's current score without multiplier
let multiplier = 1; //user's multiplier
let total = 0; //total = score * multiplier
//let storedScore = localStorage.getItem('highscore') || 0; //gets high score from local storage

const checkRecordScore = () => { //if user's score is greater than high score, update high score
    if(total > localStorage.getItem('highscore')){
        localStorage.setItem('highscore', total);
        playSFX(effects[2]);
        highScoreLabel.style.visibility = 'visible'; //user notified off new highscore
        deathInfo.style.visibility = 'hidden';
    }else{
        playSFX(effects[1]);
        deathInfo.style.visibility = 'visible';
        highScoreLabel.style.visibility = 'hidden'; //user notified off new highscore
    }
};

const enemySpawnLoc = [ 
    /*Enemies will spawn from a different corner each time, 
    corners are numbered clockwise starting from the top left. */
        [{x: 100, y: 100}, {x: 100, y: 60}, {x: 80, y: 80}, {x: 60, y: 100}, {x: 60, y: 60}, {x: 70, y: 100}, {x: 70, y: 70}, {x: 100, y: 70},{x: 90, y: 90},{x: 100, y: 90}],
        [{x: canvas.width - 100, y: 100}, {x: canvas.width - 100, y: 60}, {x: canvas.width - 80, y: 80}, {x: canvas.width - 60, y: 100}, {x: canvas.width - 60, y: 60}, {x: canvas.width - 70, y: 100}, {x: canvas.width - 70, y: 70}, {x: canvas.width - 100, y: 70},{x: canvas.width - 90, y: 90},{x: canvas.width - 100, y: 90}],
        [{x: 100, y: canvas.height - 100}, {x: 100, y: canvas.height - 60}, {x: 80, y: canvas.height - 80}, {x: 60, y: canvas.height - 100}, {x: 60, y: canvas.height - 60}, {x: 70, y: canvas.height - 100}, {x: 70, y: canvas.height - 70}, {x: 100, y: canvas.height - 70},{x: 90, y: canvas.height - 90},{x: 100, y: canvas.height - 90} ],
        [{x: canvas.width - 100, y: canvas.height - 100}, {x: canvas.width - 100, y: canvas.height - 60}, {x: canvas.width - 80, y: canvas.height - 80}, {x: canvas.width - 60, y: canvas.height - 100}, {x: canvas.width - 60, y: canvas.height - 60}, {x: canvas.width - 70, y: canvas.height - 100}, {x: canvas.width - 70, y: canvas.height - 70}, {x: canvas.width - 100, y: canvas.height - 70}, {x: canvas.width - 90, y: canvas.height - 90}, {x: canvas.width - 100, y: canvas.height - 90}]
];

//create gate/enemy cache to store sprites on init
let enemy_Cache = []; 
let gate_Cache = [];

//fills cache with gate/enemy sprites on game start
const initialSpawn = () => {
    for(let i = 0; i < 500; i++){
        enemy_Cache.push(new Enemy(0, 0));
        gate_Cache.push(new Gate(0, 0));
    }
};

//Soundtrack & SFX
let effects = ['audio/sfx/explosionSFX.mp3', 'audio/sfx/gameoverSFX.mp3', 'audio/sfx/highscoreSFX.mp3', 'audio/sfx/startSFX.mp3'];

const playSFX = (sfx) => {
    let audio = document.createElement('audio');
    audio.src = sfx;
    audio.volume = 0.2;
    audio.play();
};

class Player{
    constructor(){
        this.x = canvas.width / 2; //starting point the center of canvas
        this.y = canvas.height / 2;
        this.width = 50; //player width
        this.height = 50; //player height
        this.angle = 0;
        this.img = new Image();
    }

    update(){
        this.draw();

        let dx = this.x - 25 - mouse.x;
        let dy = this.y - 25 - mouse.y;

        let radAngle  = Math.atan2(dy, dx);

        this.angle = radAngle;

        if(mouse.x != this.x){
            this.x -= dx/25;
        }
        if(mouse.y != this.y){
            this.y -= dy/25;
        }
    }

    draw(){
    
        //sprite moves to where mouse is clicked
        if(mouse.click){ 
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        this.img.src = "sprites/spacestation.png";
        ctx.restore();
    }
}

class Enemy{
    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
        this.radius = 20;
        this.diameter = 40;
        this.startTime; //time of spawn
        this.currTime; //current time
        this.delta; // currTime - startTime
        this.distance; //distance from the player
        this.speed = difficulty; //speed set to user input
        this.isParticle = false; //is the object being displayed as an enemy or particle
        this.img = new Image();
    }

    respawn(){ //fires every time an enemy spawns giving correct start time
        let me = this;

        me.startTime = performance.now(); //create timestamp using computer's internal clock
        me.isParticle = false; //displays itself as enemy ship
        me.speed = difficulty; //changes speed back to enemy speed (not particle speed)
    }

    update(){
        let me = this;

        let dx = player.x - me.x; //distance from player (x-axis)
        let dy = player.y - me.y; //distance from player (y-axis)
        let honeAngle = Math.atan2(dy, dx); //calculating the angle between enemy and player

        me.distance = Math.sqrt(dx*dx + dy*dy); //calculating distance from player

        me.currTime = performance.now(); //create timestamp

        //calculating time elapsed from spawn, enemies become deadly once delta passes 1000
        me.delta = me.currTime - me.startTime;

        if(me.isParticle){
            if(me.distance < 150){//if gem is less than 150 away, get sucked in by the player
                me.x += me.speed * Math.cos(honeAngle);
                me.y += me.speed * Math.sin(honeAngle);
            }else{
                me.x = me.x; //if particle AND distance to player is greater than 150, gem is stationary
                me.y = me.y;
            }
        }else{
            //if not particle, hone in on player
            me.x += me.speed * Math.cos(honeAngle);
            me.y += me.speed * Math.sin(honeAngle);
        }

        me.draw();
    }

    draw(){
        let me = this;

        if(me.isParticle){//if enemy is particle, display as particle and shrink to 3/4 size
            ctx.drawImage(me.img, me.x - me.radius, me.y - me.radius, me.diameter * 0.75, me.diameter * 0.75);
            me.img.src = 'sprites/gem.png';
        }else{//if enemy is not particle, display as enemy at full size
            ctx.drawImage(me.img, me.x - me.radius, me.y - me.radius, me.diameter, me.diameter);
            me.img.src = 'sprites/enemy.png';
        }
    }
}

class Gate{
    constructor(_x, _y){
        this.x = _x; //sprite hitbox is only the top-left corner of the square, withdrawing width & height /2
        this.y = _y;
        this.hypotenus;
        this.distanceClearGate1; //distance from gate detonation (kills gate)
        this.distanceClearGate2; // a second distance point was used to improve hitbox (kills gate)
        this.distanceMine1; //distance from player to mine 1 (kills player)
        this.distanceMine2; //distance from player to mine 2 (kills player)
        this.startTime; //time at spawn
        this.currTime; //current time
        this.delta; //current time - start time
        this.width = 75;
        this.height = 133;
        this.theta; //rotational angle in degrees
        this.rotation = Math.floor(Math.random() * 180); //rotational angle in radians
        this.rotationSpeed = 0.05; //rotational velocity
        this.img = new Image();
    }

    respawn(){ //when reusing objects you have to reset the spawn location
        let me = this;

        me.x = random(500, 1200); //assigning random x, y co-ordinates
        me.y = random(50, 450);

        me.startTime = performance.now(); //create timestamp using computer's internal clock
    }

    update(){
        let me = this;

        //rotational velocity added to rotation angle (radians)
        me.rotation += me.rotationSpeed;

        //rotation angle in degrees
        me.theta = me.rotation * Math.PI / 180;

        //radius of rotation equals the rectangle's hypotenus 
        me.hypotenus = Math.sqrt(me.x * me.x + me.y * me.y);
        
        //using linear rotational transformation to find x,y after rotation
        me.x = me.hypotenus * Math.cos(me.theta);
        me.y = me.hypotenus * Math.sin(me.theta);
        
        //distance from player to ClearGate1
        let dx = player.x - me.x; //sprite hitbox relocation fixed
        let dy = player.y - me.y - 65;    

        me.distanceClearGate1 = Math.sqrt(dx*dx + dy*dy);

        //distance from player to ClearGate2
        let dx4 = player.x - me.x; //sprite hitbox relocation fixed
        let dy4 = player.y - me.y - 80;    

        me.distanceClearGate2 = Math.sqrt(dx4*dx4 + dy4*dy4);

        //distance from player to mine 1
        let dx1 = player.x - me.x - 25; 
        let dy1 = player.y - me.y - 30;    

        me.distanceMine1 = Math.sqrt(dx1*dx1 + dy1*dy1);

        //distance from player to mine 2
        let dx2 = player.x - me.x - 25 + 115 * Math.sin(me.theta); //fixes mine location bug by add rotational transformation
        let dy2 = player.y - me.y - 105;    

        me.distanceMine2 = Math.sqrt(dx2*dx2 + dy2*dy2);

        me.currTime = performance.now(); //creating another timestamp

        me.delta = me.currTime - me.startTime; //calculating time elapsed

        me.draw();
    } 

    draw(){
        let me = this;

        ctx.save();
        ctx.translate(me.x, me.y);
        ctx.rotate(Math.sin(me.theta)); //switch to neg rotation for better movement, edit to translation needed though
        ctx.drawImage(me.img, 0, 0, me.width, me.height);
        ctx.rotate(-me.rotation * Math.PI / 180);
        ctx.translate(-me.x, -me.y);
        ctx.restore();
        me.img.src = 'sprites/gate5.png';
    }
}

const game = { //thinking of changing object name to game due to it's interaction with all classes.

    enemyArray: [], //stores enemy sprites while on screen

    gateArray: [], //stores gate sprites while on screen

    enemyCounter: 1, //used to increment the amount of enemies that spawn

    gameLoop: function(){

        player.update();

        if(gameFrame % 50 == 0){
            //every 50 frames a new enemy spawns at a random corner
            let randomCorner = Math.floor(Math.random() * 4);

            for(let i = 0; i < this.enemyCounter; i++){ //enemyCounter controls enemy spawn amount
                let newEnemy;
                newEnemy = enemy_Cache.pop(); //remove cached sprite
                newEnemy.respawn();
                newEnemy.x = enemySpawnLoc[randomCorner][i].x;
                newEnemy.y = enemySpawnLoc[randomCorner][i].y;
                this.enemyArray.push(newEnemy);
            }
           
            if(gameFrame % 1000 == 0){
                if(this.enemyCounter < 9){
                    this.enemyCounter++;
                } //every 1000 frames increase enemy spawn number by 1
            }

            let newGate;

            newGate = gate_Cache.pop(); //removes cached gate sprite
            newGate.respawn(); //resets gate co-ordinates so it doesn't just reappear in the same place
            
            this.gateArray.push(newGate); 
        }

        for(let i = 0; i < this.gateArray.length; i++){
            this.gateArray[i].update();

            //too much logic in this nested loop, reducing framerate

            if(this.gateArray[i].delta > 2000 && this.gateArray[i].distanceMine1 < player.width / 2){
            //The gate's mines are safe for 2 seconds after spawn
                gameOver = true;
                killedByMine1 = true; //killed by mine 1 
                modal.style.visibility = 'visible'; //modal popup upon death
                deathInfo.innerHTML = "KILLED BY MINE 1"; //death info pop up upon death
                deathInfo.style.visibility = 'visible';
            }

            if(this.gateArray[i].delta > 2000 && this.gateArray[i].distanceMine2 < player.width / 2){
                gameOver = true;
                killedByMine2 = true; //killed by mine 2
                modal.style.visibility = 'visible'; //modal popup upon death
                deathInfo.innerHTML = "KILLED BY MINE 2"; //death info pop up upon death
                deathInfo.style.visibility = 'visible';
            }

            if(this.gateArray[i].distanceClearGate1 < player.width / 2 || this.gateArray[i].distanceClearGate2 < player.width / 2){ //when player passes through gate, enemies with distance < 200 are killed
                for(let m = 0; m < this.enemyArray.length; m++){
                    if(this.enemyArray[m].distance < 200){
                        this.enemyArray[m].isParticle = true;
                        this.enemyArray[m].speed = 10; //change speed as enemy becomes particle
                        score += 50;
                    }
                }
                //gate_Cache.slice(0, this.gateArray[i]).concat(gate_Cache.slice(-this.gateArray[i]));
                //gate_Cache.push(this.gateArray.slice(this.gateArray.indexOf(this.gateArray[i])));
                gate_Cache.push(removeObjectFromArray(this.gateArray[i], this.gateArray)); //gate is removed and added to the gate cache for later use, need to check if working...
                playSFX(effects[0]); //plays explosion SFX
                i--;
                score += 20;
            }
        }

        for(let k = 0; k < this.enemyArray.length; k++){

                this.enemyArray[k].update();

                if(!this.enemyArray[k].isParticle && 
                    this.enemyArray[k].delta > 1000 && //allows for 1 second after spawn before becoming deadly
                    this.enemyArray[k].distance < this.enemyArray[k].radius / 2 + player.width / 2){
                    gameOver = true; //if enemy gets too close, game over!
                    modal.style.visibility = 'visible';
                    deathInfo.innerHTML = "KILLED BY ALIEN";
                    deathInfo.style.visibility = 'visible';
                }

                if(this.enemyArray[k].isParticle && this.enemyArray[k].distance < 20){
                    //enemy_Cache = enemy_Cache.slice(0, this.enemyArray[k]).concat(enemy_Cache.slice(-this.enemyArray[k]));
                    //enemy_Cache.push(this.enemyArray.splice(this.enemyArray[k], 1));
                    this.enemyArray[k].speed = difficulty; //set speed back to normal as particle is absorbed
                    enemy_Cache.push(removeObjectFromArray(this.enemyArray[k], this.enemyArray));
                    k--;
                    multiplier++;
                }
        }
    
        total = multiplier * score * difficulty; //adding the true total score, added difficulty factor to incentivise users to choose higher game speed
        scoreElement.innerHTML = numberWithCommas(total); //applying score to html element
        highscoreElement.innerHTML = `High Score: ${numberWithCommas(localStorage.getItem('highscore') || 0)}`;
        modalScore.innerHTML = numberWithCommas(total);
        multiplierElement.innerHTML = `${multiplier}x`; //applying multiplier to html element
    },

    restart: function(){
        this.enemyArray = []; //remove enemies from screen
        this.gateArray = []; //remove gates from screen
        this.enemyCounter = 1; //set enemy counter back to 1
        score = 0; //reset score
        multiplier = 0; //reset multiplier
        total = 0;
        gameOver = false; //allows animation to be called recursively 
        player.x = canvas.width / 2; //centering the player
        player.y = canvas.height / 2;
        modal.style.visibility = 'hidden'; //hide modal styling
        deathInfo.style.visibility = 'hidden'; //hide cause of death
        highScoreLabel.style.visibility = 'hidden';
    },

    return: function(){
        this.enemyArray = []; //remove enemies from screen
        this.gateArray = []; //remove gates from screen
        this.enemyCounter = 1; //set enemy counter back to 1
        score = 0; //reset score
        multiplier = 0; //reset multiplier
        total = 0;
        player.x = canvas.width / 2; //centering the player
        player.y = canvas.height / 2;
        modal.style.visibility = 'hidden'; //hide modal styling
        deathInfo.style.visibility = 'hidden'; //hide cause of death
        multiplierElement.style.visibility = "hidden";
        scoreElement.style.visibility = "hidden";
        difficultyElem.style.visibility = "visible";
        highScoreLabel.style.visibility = 'hidden';
        tutorial.style.visibility = 'visible';

        menuActive = true;
        gameOver = false;
    }
};

const player = new Player();

const startScreen = () => {

    iplayer.style.visibility = 'visible';
    speedOutput.style.color = 'green';

    gameMode(difficulty);

    if(menuActive){
        
        if(isMobile){
            mobileStart.style.top = canvas.width / 2;
            mobileStart.style.left = canvas.height / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBackground();

            ctx.font = canvas.width / 60 +'px DotGothic16';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText('Energy weapons are down!', canvas.width / 2, canvas.height / 2 + 50, 900);
            ctx.fillText('Pass through the center of gates to manage the enemy horde.', canvas.width / 2, canvas.height / 2 + 75, 900);
            ctx.fillText('Beware of deadly mines at the edge of gates!', canvas.width / 2, canvas.height / 2 + 100, 900);

            player.update(); //player methods placed here to create z-index effect

            ctx.font = canvas.width / 20 + 'px Orbitron'; //player sprite is hidden behind title but not other text hence why it is coded here
            ctx.fillStyle = `hsl(${hue}, 100%, 35%)`; //hsl colour change effect
            ctx.textAlign = "center";
            ctx.fillText('AGAINST ALL ODDS', canvas.width / 2, canvas.height / 2 - 25, 800, 200);

            hue++; //changes hsl value every animation frame

            requestAnimationFrame(startScreen);

        }else if(isTablet){
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBackground();

            ctx.font = canvas.width / 60 +'px DotGothic16';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText('Energy weapons are down!', canvas.width / 2, canvas.height / 2, 900);
            ctx.fillText('Pass through the center of gates to manage the enemy horde.', canvas.width / 2, canvas.height / 2 + 50, 900);
            ctx.fillText('Beware of deadly mines at the edge of gates!', canvas.width / 2, canvas.height / 2 + 100, 900);

            player.update(); //player methods placed here to create z-index effect

            ctx.font = canvas.width / 20 + 'px Orbitron'; //player sprite is hidden behind title but not other text hence why it is coded here
            ctx.fillStyle = `hsl(${hue}, 100%, 35%)`; //hsl colour change effect
            ctx.textAlign = "center";
            ctx.fillText('AGAINST ALL ODDS', canvas.width / 2, canvas.height / 2 - 100, 800, 200);

            hue++; //changes hsl value every animation frame

            requestAnimationFrame(startScreen);
        }else{
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBackground();

            ctx.font = canvas.width / 60 +'px DotGothic16';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText('Energy weapons are down!', canvas.width / 2, canvas.height / 2, 900);
            ctx.fillText('Pass through the center of gates to manage the enemy horde.', canvas.width / 2, canvas.height / 2 + 50, 900);
            ctx.fillText('Beware of deadly mines at the edge of gates!', canvas.width / 2, canvas.height / 2 + 100, 900);

            ctx.font = canvas.width / 40 + 'px Orbitron';
            ctx.fillStyle = `hsl(${hue}, 100%, 35%)`; //hsl colour change effect
            ctx.textAlign = "center";
            ctx.fillText('START (S)           BACKGROUND (B)', canvas.width / 2, canvas.height / 2 + 200, 900);

            player.update(); //player methods placed here to create z-index effect

            ctx.font = canvas.width / 20 + 'px Orbitron'; //player sprite is hidden behind title but not other text hence why it is coded here
            ctx.fillStyle = `hsl(${hue}, 100%, 35%)`; //hsl colour change effect
            ctx.textAlign = "center";
            ctx.fillText('AGAINST ALL ODDS', canvas.width / 2, canvas.height / 2 - 100, 800, 200);

            hue++; //changes hsl value every animation frame

            requestAnimationFrame(startScreen);
        }
    
    }else{
        animate();
    }
};

const animate = () => {
    tutorial.style.visibility = 'hidden';
    iplayer.style.visibility = 'hidden';
    multiplierElement.style.visibility = 'visible'; //making game elements visible on game start
    scoreElement.style.visibility = 'visible';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    game.gameLoop();
        
    if(gameOver){
        checkRecordScore();
    }else{
        gameFrame++;
        //creates animation loop through recursion
        requestAnimationFrame(animate);
    }
};

//Event Listeners

window.addEventListener('keyup', e => {
    if(e.keyCode === 83){ //when the 's' key is pressed
        menuActive = false; //triggers game start event
        difficultyElem.style.visibility = "hidden"; //hides difficulty customisation element
        playSFX(effects[3]); //play game start SFX
    }
    if(e.keyCode === 66){ //when the 'b' key is pressed
        _background.src = backgroundArr[randomBackground()]; //triggers background change
        localStorage.setItem('background#', _background.src); //stores background choice in local storage for later use
    }
});

window.addEventListener('resize', () => {
    canvas.width = document.documentElement.clientWidth - 5; //adjust canvas width if browser is resized
    canvas.height = document.documentElement.clientHeight - 5; //adjust canvas height if browser is resized
    checkDevice();
});

document.addEventListener('fullscreenchange', () => {
    canvas.width = document.documentElement.clientWidth - 5; //adjust canvas width if browser is resized
    canvas.height = document.documentElement.clientHeight - 5; //adjust canvas height if browser is resized
});

document.getElementById('mobileStart').addEventListener('click', () => {
    animate();
    playSFX(effects[3]);
});

document.getElementById('restartButton').addEventListener('click', () => {
    game.restart(); //restarts game loop for the user
    animate(); //restart animation loop
    playSFX(effects[3]); //play game start SFX
});

document.getElementById('homeButton').addEventListener('click', () => {
    game.return(); //returns the user to the start screen
    startScreen(); //renders start screen instead of game loop
});

document.addEventListener("DOMContentLoaded", () => {
    difficulty = localStorage.getItem('localDifficulty') || 5; //sets difficulty on page load to 5 if no local difficulty is set
    highscoreElement.innerHTML = `High Score: ${numberWithCommas(localStorage.getItem('highscore') || 0)}`; //checks for high score in local storage to display
    speedSlider.value = difficulty; //update html slider to reflect local difficulty
    initialSpawn(); //spawns sprites for later use in game
    startScreen(); //renders start screen
    checkDevice();
});

