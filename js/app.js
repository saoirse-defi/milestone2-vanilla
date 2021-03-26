import { gameMode, random, randomBackground, restart, removeObjectFromArray } from './utils.js';

let container = document.getElementById('container');

const canvas = document.getElementById('canvas'); //defining canvas element
const ctx = canvas.getContext('2d'); //defining whether 2D or 3D

canvas.width = window.innerWidth; //setting canvas dimensions to fit viewport
canvas.height = window.innerHeight;

const scoreElement = document.getElementById('scoreElement'); //defining html elements as variables
const modal = document.getElementById('modal');
const modalScore = document.getElementById('modalScore');
const highScoreLabel = document.getElementById('highScoreLabel');
const multiplierElement = document.getElementById('multiplierElement');
const restartButton = document.getElementById('restartButton');
const deathInfo = document.getElementById('deathInfo');
const speedSlider = document.getElementById('speedSlider');
const difficultyElem = document.getElementById('difficulty');

let difficulty;
let _difficulty; //baby, amateur, professional, god

speedSlider.oninput = () => { //user chooses enemy speed at startscreen
    
    difficulty = speedSlider.value;

    localStorage.setItem('localDifficulty', difficulty); //saves new difficulty to local storage
};

const BG = {//defining background co-ordinates for background to match canvas size
    x: 0, 
    y: 0,
    width: canvas.width,
    height: canvas.height
}; 

const drawBackground = () => { //applies starry night background
    ctx.drawImage(_background, BG.x, BG.y, BG.width, BG.height);
};

const stars = ['sprites/stars.png', 'sprites/stars1.png', 'sprites/stars2.png', 'sprites/stars3.png', 'sprites/stars4.png', 'nebula01.png', 'nebula02.png'];
//array of background image locations

const _background = new Image(); //set inital background
_background.src = stars[0];


let hue = 0; //used in conjunction with requestionAnimationFrame to create hsl color change effect
let menuActive = true; //tracks whether startscreen is active
let change = false;
let gameOver = false; //tracks whether player has been killed by enemy
let killedByMine1 = false; //tracks which mine killed player
let killedByMine2 = false; //1 (top) 2 (bottom)
let gameFrame = 0; //tracks number of frames that pass
let score = 0;
let multiplier = 1;
let total = 0; //total score is score x multiplier

let highScore = localStorage.getItem('highscore1') || 0; //gets highScore from local storage

const checkRecordScore = () => { //if user beats score, update high score
    if(total > localStorage.getItem('highscore1')){
        localStorage.setItem('highscore1', total);
        highScoreLabel.style.display = 'block'; //user notified off new highscore
    }
};

const enemySpawnLoc = [ 
    /*Enemies will spawn from a different corner each time, 
    corners are numbered clockwise starting from the top left. */
        {x: 100, y: 100},
        {x: canvas.width - 100, y: 100},
        {x: 100, y: canvas.height - 100},
        {x: canvas.width - 100, y: canvas.height - 100}
];

let canvasPosition = canvas.getBoundingClientRect(); //calculating canvas size relative to viewport

const mouse = { //set mouse co-ordinates on application start
    x: canvas.width / 2,
    y: canvas.height / 2,
};

const mouseMoveHandler = (e) => { //tracks user's mouse input
    let relX = e.x - canvasPosition.left;
    let relY = e.y - canvasPosition.top;

    if(relX > 0 && relX < canvas.width){
        mouse.x = event.x - canvasPosition.left;
        mouse.y = event.y - canvasPosition.top;
    }
};

canvas.addEventListener("mousemove", mouseMoveHandler, false);

//create gate/enemy cache to store sprites on init
let enemy_Cache = new Array(); 
let gate_Cache = new Array();

//fills cache with gate/enemy sprites on game start
const initialSpawn = () => {
    for(let i = 0; i < 500; i++){
        enemy_Cache.push(new Enemy(0, 0));
        gate_Cache.push(new Gate(0, 0));
    }
};

class Player{
    constructor(){
        this.x = canvas.width / 2; //starting point the center of canvas
        this.y = canvas.height / 2;
        this.width = 50;
        this.height = 50;
        this.radius = 10;
        this.angle = 0;
        this.img = new Image();
    }

    update(){
        let me = this;

        me.draw();

        let dx = me.x - 25 - mouse.x;
        let dy = me.y - 25 - mouse.y;

        let radAngle  = Math.atan2(dy, dx);

        me.angle = radAngle;

        if(mouse.x != me.x){
            me.x -= dx/20;
        }
        if(mouse.y != me.y){
            me.y -= dy/20;
        }
    }

    draw(){
        let me = this;
        //sprite moves to where mouse is clicked
        if(mouse.click){ 
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(me.x, me.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(me.x, me.y);
        ctx.rotate(me.angle);
        ctx.drawImage(me.img, 0 - me.width / 2, 0 - me.height / 2, me.width, me.height);
        me.img.src = "sprites/spacestation.png";
        ctx.restore();
    }
};


class Enemy{
    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
        this.radius = 20;
        this.diameter = 40;
        this.startTime; //time of spawn
        this.currTime; //current time
        this.delta; // currTime - startTime
        this.distance;
        this.speed = difficulty; //speed set to user input
        this.isParticle = false;
        this.img = new Image();
    }

    respawn(){ //fires every time an enemy spawns giving correct start time
        let me = this;

        me.startTime = performance.now(); //create timestamp using computer's internal clock
        me.isParticle = false;
        me.speed = difficulty;
    }

    update(){
        let me = this;

        let dx = player.x - me.x;
        let dy = player.y - me.y;
        let honeAngle = Math.atan2(dy, dx);

        me.distance = Math.sqrt(dx*dx + dy*dy);

        me.currTime = performance.now();

        me.delta = me.currTime - me.startTime;

        if(me.isParticle){
            if(me.distance < 150){
                me.x += me.speed * Math.cos(honeAngle);
                me.y += me.speed * Math.sin(honeAngle);
            }else{
                me.x = me.x; //if particle and distance to player is less than 100, gem is stationary
                me.y = me.y;
            }
        }else{
            me.x += me.speed * Math.cos(honeAngle);
            me.y += me.speed * Math.sin(honeAngle);
        }

        me.draw();
    }

    draw(){
        let me = this;

        if(me.isParticle){
            ctx.drawImage(me.img, me.x - me.radius, me.y - me.radius, me.diameter, me.diameter);
            me.img.src = 'sprites/gem.png';
        }else{
            ctx.drawImage(me.img, me.x - me.radius, me.y - me.radius, me.diameter, me.diameter);
            me.img.src = 'sprites/enemy.png';
        }
    }
};


class Gate{
    constructor(_x, _y){
        this.x = _x; //sprite hitbox is only the top-left corner of the square, withdrawing width & height /2
        this.y = _y;
        this.radius;
        this.distance; //distance from player to center of gate
        this.distance1; //distance from player to mine 1
        this.distance2; //distance from player to mine 2
        this.startTime; //time at spawn
        this.currTime; //current time
        this.delta; //current time - start time
        this.width = 75;
        this.height = 133;
        this.theta;
        this.rotation = random(0, 360);
        this.rotationSpeed = random(0.03, 0.05);
        this.img = new Image();
    }

    respawn(){ //when reusing objects you have to reset the spawn location
        let me = this;

        me.x = random(200, 1000);
        me.y = random(50, 450);
        //me.rotation = random(0, 360);
        //me.rotationSpeed = random(0.03, 0.05);

        me.startTime = performance.now();
    }

    update(){
        let me = this;

        //rotational velocity added to rotation angle (radians)
        me.rotation += me.rotationSpeed;

        //rotation angle in degrees
        me.theta = me.rotation * Math.PI / 180;

        //radius of rotation equals the rectangle's hypotenus 
        me.radius = Math.sqrt(me.x * me.x + me.y * me.y);
        
        //using linear rotational transformation to find x,y after rotation
        me.x = me.radius * Math.cos(me.theta);
        me.y = me.radius * Math.sin(me.theta);
        
        //distance from player to center of gate
        let dx = player.x - me.x; //sprite hitbox relocation fixed
        let dy = player.y - me.y - 75;    

        me.distance = Math.sqrt(dx*dx + dy*dy);

        //distance from player to mine 1
        let dx1 = player.x - me.x - 25; 
        let dy1 = player.y - me.y - 30;    

        me.distance1 = Math.sqrt(dx1*dx1 + dy1*dy1);

        //distance from player to mine 2
        let dx2 = player.x - me.x - 25; 
        let dy2 = player.y - me.y - 125;    

        me.distance2 = Math.sqrt(dx2*dx2 + dy2*dy2);

        me.currTime = performance.now();

        me.delta = me.currTime - me.startTime;

        me.draw();
    } 

    draw(){
        let me = this;

        ctx.save();
        ctx.translate(me.x, me.y);
        ctx.rotate(me.rotation * Math.PI / 180); //switch to neg rotation for better movement, edit to translation needed though
        ctx.drawImage(me.img, 0, 0, me.width, me.height);
        ctx.rotate(-me.rotation * Math.PI / 180);
        ctx.translate(-me.x, -me.y);
        ctx.restore();
        me.img.src = 'sprites/gate5.png';
    }
};

const game = { //thinking of changing object name to game due to it's interaction with all classes.

    enemyArray: [], 

    gateArray: [],

    gameLoop: function(){

        player.update();

        if(gameFrame % 50 == 0){
            //every 50 frames a new enemy spawns at a random corner
            let randomCorner = Math.floor(Math.random() * 4);
            let newEnemy;

            newEnemy = enemy_Cache.pop();
            newEnemy.respawn(); //changes image from particle to enemy and starts timer
            newEnemy.x = enemySpawnLoc[randomCorner]['x'];
            newEnemy.y = enemySpawnLoc[randomCorner]['y'];
            
            this.enemyArray.push(newEnemy);
        }
        
        if(gameFrame % 50 == 0){
            let newGate;

            newGate = gate_Cache.pop();
            newGate.respawn(); //resets gate co-ordinates so it doesn't just reappear in the same place
            
            this.gateArray.push(newGate);
        }

        for(let i = 0; i < this.gateArray.length; i++){
            this.gateArray[i].update();

            //too much logic in this nested loop, reducing framerate

            if(this.gateArray[i].delta > 2000 && this.gateArray[i].distance1 < player.radius * 2){
            //The gate's mines are safe for 2 seconds after spawn
                gameOver = true;
                killedByMine1 = true; //killed by mine 1 
                modal.style.visibility = 'visible'; //modal popup upon death
                deathInfo.innerHTML = "KILLED BY MINE 1"; //death info pop up upon death
                deathInfo.style.visibility = 'visible';
            }

            /*if(this.gateArray[i].distance2 < player.radius * 2){
                gameOver = true;
                killedByMine2 = true; //killed by mine 2
            }*/

            if(this.gateArray[i].distance < (player.radius * 2)){ //when player passes through gate, enemies with distance < 200 are killed
                for(let m = 0; m < this.enemyArray.length; m++){
                    if(this.enemyArray[m].distance < 200){
                        this.enemyArray[m].isParticle = true;
                        this.enemyArray[m].speed = 9; //change speed as enemy becomes particle
                        score += 50;
                    }
                }
                //gate_Cache = gate_Cache.slice(0, this.gateArray[i]).concat(gate_Cache.slice(-this.gateArray[i]));
                //gate_Cache.push(this.gateArray.slice(this.gateArray[i], 1));
                gate_Cache.push(removeObjectFromArray(this.gateArray[i], this.gateArray)); //gate is removed and added to the gate cache for later use, need to check if working...
                i--;
                score += 25;
            }
        }

        for(let k = 0; k < this.enemyArray.length; k++){

                this.enemyArray[k].update();

                if(!this.enemyArray[k].isParticle && 
                    this.enemyArray[k].delta > 1000 && //allows for 1 second after spawn before becoming deadly
                    this.enemyArray[k].distance < this.enemyArray[k].radius / 2 + player.radius){
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
    
        total = multiplier * score; //adding the true total score
        scoreElement.innerHTML = `${total} (${highScore})`; //applying score to html element
        modalScore.innerHTML = total;
        multiplierElement.innerHTML = `${multiplier}x`; //applying multiplier to html element
        
        console.log('Gate Array Length', gate_Cache.length);
        //should be ~500 but getting random large numbers instead, different each time
        console.log('Enemy Array Length', enemy_Cache.length); 
        console.log('difficulty', difficulty);
    },

    restart: function(){
        this.enemyArray.splice(0, this.enemyArray.length);
        this.gateArray.splice(0, this.gateArray.length);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        animate();
    }
};

const player = new Player();

const startScreen = () => {

    if(menuActive){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();

        ctx.font = '22.5px DotGothic16';
        ctx.fillStyle = 'white';
        ctx.fillText('Energy weapons are down!', canvas.width / 2 - 150, canvas.height / 2 + 100, 900);
        ctx.fillText('Pass through gates to manage the enemy horde.', canvas.width / 2 - 265, canvas.height / 2 + 150, 900);

        ctx.font = '20px Orbitron'
        ctx.fillStyle = `hsl(${hue}, 100%, 35%)`;
        ctx.fillText('START (S)                                                         BACKGROUND (B)', canvas.width / 2 - 340, canvas.height / 2 + 250, 900);

        player.update(); //player methods placed here to create z-index effect

        ctx.font = '80px Orbitron'; //player sprite is hidden behind title but not other text
        ctx.fillStyle = `hsl(${hue}, 100%, 35%)`;
        ctx.fillText('AGAINST ALL ODDS', canvas.width / 2 - 400, canvas.height / 2 - 100, 800, 200);

        hue++; //changes hsl value every animation frame

        requestAnimationFrame(startScreen);
    }else{

        animate();
    }
    
};

const animate = () => {

    multiplierElement.style.visibility = 'visible'; //making game elements visible on game start
    scoreElement.style.visibility = 'visible';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    game.gameLoop();

    //game speed increases with score
    /*if(score > 100000000){
        game.speedUp();
    }else if(score > 10000000){
        game.speedUp();
    }else if(score > 1000000){
        game.speedUp();
    }else if(score > 100000){
        game.speedUp();
    }else if(score > 50000){
        game.speedUp();
    }*/
        
    if(gameOver){
        checkRecordScore();
    }else{
        gameFrame++;
        //creates animation loop through recursion
        requestAnimationFrame(animate);
    }
};

window.addEventListener('keyup', e => {
    if(e.keyCode === 83){
        menuActive = false; //triggers game start event
        difficultyElem.style.visibility = "hidden";
    }
    if(e.keyCode === 66){
        _background.src = stars[randomBackground()]; //triggers background change
    }
});

document.getElementById('restartButton').addEventListener('click', () => {
    restart();
});

document.addEventListener("DOMContentLoaded", () => {
    difficulty = localStorage.getItem('localDifficulty') || 5; //sets difficulty on page load to 5 if no local difficulty is set
    speedSlider.value = difficulty; //update html slider to reflect local difficulty
    initialSpawn();
    startScreen(); 
});
