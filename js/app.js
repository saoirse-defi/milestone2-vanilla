const canvas = document.getElementById('gameboard'); //defining canvas element
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const random = (min, max) => {
    return Math.random() * ((max - min) + min);
}; //provides random decimal between min and max

const stars = ['sprites/stars.png', 'sprites/stars1.png', 'sprites/stars2.png', 'sprites/stars3.png', 'sprites/stars4.png'];
//array of background image locations

const randomBackground = () => {
    let starsInt = Math.floor(random(0, 4));
    return starsInt;
};

const BG = {
    x1: 0, 
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}; //background dimensions to match canvas size

const drawBackground = () => {
    let background = new Image();
    background.src = stars[0];
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
};

const changeBackground = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let custom = new Image();
    custom.src = `sprites/stars${randomBackground()}.png`;
    ctx.drawImage(custom, BG.x1, BG.y, BG.width, BG.height);
};

let hue = 0; //used in conjunction with requestionAnimationFrame to create hsl color change effect
let menuActive = true; //tracks whether startscreen is active
let change = false;
let gameOver = false; //tracks whether player has been killed by enemy
let killedByMine = false;
let gameFrame = 0; //tracks number of frames that pass
let score = 0;
let multiplier = 1;
let total = 0; //total score is score x multiplier

let highScore = localStorage.getItem('highscore1') || 0; //gets highScore from local storage

const checkRecordScore = () => { //if user beats score, update high score
    if(score > localStorage.getItem('highscore1')){
        localStorage.setItem('highscore1', total);
        highScore = total;
    }
};

const removeObjectFromArray = (obj, arr) => { 
    let i = arr.indexOf(obj);
    if (i !== -1) {
        let _obj = arr[i];
        arr.splice(i, 1);
		return _obj;
    }
};

const enemySpawnLoc = [ //Enemies will spawn from a different corner each time, corners are numbered clockwise starting from the top left
        {x: 100, y: 100},
        {x: canvas.width - 100, y: 100},
        {x: 100, y: canvas.height - 100},
        {x: canvas.width - 100, y: canvas.height - 100}
];

let canvasPosition = canvas.getBoundingClientRect(); //calculating canvas size relative to viewport

const mouse = { //set mouse properties on application start
    x: canvas.width / 2,
    y: canvas.height / 2,
};

const mouseMoveHandler = (e) => {
    let relX = e.x - canvasPosition.left;
    let relY = e.y - canvasPosition.top;

    if(relX > 0 && relX < canvas.width){
        mouse.x = event.x - canvasPosition.left;
        mouse.y = event.y - canvasPosition.top;
    }
};

canvas.addEventListener("mousemove", mouseMoveHandler, false);

let enemy_Cache = new Array(500);
let gate_Cache = new Array(500);

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
        this.distance;
        this.speed = 2;
        this.isParticle = false;
        this.img = new Image();
    }

    update(){
        let me = this;

        let dx = player.x - me.x;
        let dy = player.y - me.y;
        let honeAngle = Math.atan2(dy, dx);

        me.distance = Math.sqrt(dx*dx + dy*dy);

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
        this.endX;
        this.endY;
        this.radius;
        this.distance; //distance from player to center of gate
        this.distance1; //distance from player to mine 1
        this.distance2; //distance from player to mine 2
        this.width = 75;
        this.height = 133;
        this.theta;
        this.rotation = random(0, 360);
        this.rotationSpeed = random(0.03, 0.05);
        this.img = new Image();
    }

    reposition(){ //when reusing objects you have to reset the spawn location
        let me = this;

        me.x = random(200, 1000);
        me.y = random(50, 450);
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
        let dx = player.x - me.x - 10; //sprite hitbox relocation fixed
        let dy = player.y - me.y - 66.5;    

        me.distance = Math.sqrt(dx*dx + dy*dy);

        //distance from player to mine 1
        let dx1 = player.x - me.x - 17.5; 
        let dy1 = player.y - me.y - 26.6;    

        me.distance1 = Math.sqrt(dx1*dx1 + dy1*dy1);

        //distance from player to mine 2
        let dx2 = player.x - me.x - 37.5; 
        let dy2 = player.y - me.y - 106.6;    

        me.distance2 = Math.sqrt(dx2*dx2 + dy2*dy2);
    } 

    draw(){
        let me = this;

        ctx.save();
        ctx.translate(me.x, me.y);
        ctx.rotate(me.rotation * Math.PI / 180); //switch to neg rotation for better movement, edit to translation needed though
        ctx.drawImage(me.img, 0, 0, me.width, me.height);
        ctx.restore();
        me.img.src = 'sprites/gate5.png';
    }
};

const game = { //thinking of changing object name to game due to it's interaction with all classes.

    enemyArray: [], 

    enemyCache: [], //dead enemies cached for later use

    gateArray: [],

    gateCache: [], //destroyed gates cached for later use

    particleArray: [],

    particleCache: [],

    gameLoop: function(){

        player.update();
        player.draw();

        if(gameFrame % 500 == 0){
            //every 50 frames a new enemy spawns at a random corner
            let randomCorner = Math.floor(Math.random() * 4);
            let newEnemy;

            newEnemy = enemy_Cache.pop();
            newEnemy.isParticle = false;
            newEnemy.speed = 2;
            newEnemy.x = enemySpawnLoc[randomCorner]['x'];
            newEnemy.y = enemySpawnLoc[randomCorner]['y'];
            
            this.enemyArray.push(newEnemy);
        }
        
        if(gameFrame % 50 == 0){
            let newGate;

            newGate = gate_Cache.pop();
            newGate.reposition(); //resets gate co-ordinates so it doesn't just reappear in the same place
            
            this.gateArray.push(newGate);
        }

        for(let i = 0; i < this.gateArray.length; i++){
            this.gateArray[i].update();
             this.gateArray[i].draw();
            //too much logic in this nested loop, reducing framerate

            if(this.gateArray[i].distance1 < (player.radius * 1.5) || this.gateArray[i].distance2 < (player.radius * 1.5)){
                gameOver = true;
                killedByMine = true;
            }

            if(this.gateArray[i].distance < (player.radius * 2)){ //when player passes through gate, enemies with distance < 200 are killed
                for(let m = 0; m < this.enemyArray.length; m++){
                    if(this.enemyArray[m].distance < 200){
                        this.enemyArray[m].isParticle = true;
                        this.enemyArray[m].speed = 7;
                        score += 50;
                    }
                }
                gate_Cache.push(removeObjectFromArray(this.gateArray[i], this.gateArray)); //gate is removed and added to the gate cache for later use, need to check if working...
                i--;
                score += 25;
            }
        }

        for(let k = 0; k < this.enemyArray.length; k++){
            this.enemyArray[k].update();
            this.enemyArray[k].draw();

                if(!this.enemyArray[k].isParticle && this.enemyArray[k].distance < this.enemyArray[k].radius / 2 + player.radius){
                    //gameOver = true; //if enemy gets too close, game over!
                }

                if(this.enemyArray[k].isParticle && this.enemyArray[k].distance < 20){
                    enemy_Cache.push(removeObjectFromArray(this.enemyArray[k], this.enemyArray));
                    multiplier++;
                }
        }
    
        total = multiplier * score; //adding the true total score
        console.log('Gate Array Length', gate_Cache.length);
        console.log('Enemy Array Length', enemy_Cache.length);
    }
};

const player = new Player();

const startScreen = () => {

    initialSpawn();

    if(menuActive){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();

        if(change){
            changeBackground();
        }

        ctx.font = '22.5px DotGothic16';
        ctx.fillStyle = 'white';
        ctx.fillText('Energy weapons are down!', canvas.width / 2 - 150, canvas.height / 2 + 100, 900);
        ctx.fillText('Pass through gates to manage the enemy horde.', canvas.width / 2 - 265, canvas.height / 2 + 150, 900);

        ctx.font = '20px Orbitron'
        ctx.fillStyle = `hsl(${hue}, 100%, 35%)`;
        ctx.fillText('Click to move. Spacebar to start. M to change background.', canvas.width / 2 - 340, canvas.height / 2 + 250, 900);

        player.update(); //player methods placed here to create z-index effect
        player.draw();

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    game.gameLoop();

    //game speed increases with score
    if(score > 100000000){
        game.speedUp();
    }else if(score > 10000000){
        game.speedUp();
    }else if(score > 1000000){
        game.speedUp();
    }else if(score > 100000){
        game.speedUp();
    }else if(score > 50000){
        game.speedUp();
    }
        
    if(gameOver && killedByMine){
        ctx.fillStyle = 'red';
        ctx.fillText(`${total}(${highScore})`, 10, 75, 200, 100);
        ctx.fillText(`${multiplier}x`, canvas.width - 150, 75, 100, 50);
        ctx.fillText("GAME OVER!", canvas.width / 2 - 145, canvas.height / 2 + 30, 300, 175);
        ctx.fillText("Killed by mine.", canvas.width / 2 - 145, canvas.height / 2 + 125, 300, 25);
        console.log(gameFrame); //uses gameframe as score counter
        checkRecordScore();
    }else if(gameOver){
        ctx.fillStyle = 'red';
        ctx.fillText(`${total}(${highScore})`, 10, 75, 200, 100);
        ctx.fillText(`${multiplier}x`, canvas.width - 150, 75, 100, 50);
        ctx.fillText("GAME OVER!", canvas.width / 2 - 145, canvas.height / 2 + 30, 300, 175);
        ctx.fillText("Killed by alien.", canvas.width / 2 - 145, canvas.height / 2 + 125, 300, 25);
        console.log(gameFrame); //uses gameframe as score counter
        checkRecordScore();
    }else{
        ctx.fillStyle = 'green';
        ctx.fillText(`${total}(${highScore})`, 10, 75, 200, 100);
        ctx.fillText(`${multiplier}x`, canvas.width - 150, 75, 100, 50);
        gameFrame++;

        //creates animation loop through recursion
        requestAnimationFrame(animate);
    }
};

window.addEventListener('keyup', e => {
    if(e.keyCode === 32){
        menuActive = false; //triggers game start event
    }
    if(e.keyCode === 77){
        change = true; //triggers background change
    }
});

document.addEventListener("DOMContentLoaded", function() { 
    startScreen(); 
});

