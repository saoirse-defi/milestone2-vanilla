const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
console.log(ctx);

const highscore = document.getElementById('highscore');

canvas.width = 1000;
canvas.height = 600;

const background = new Image();

background.src = 'sprites/stars.png';

const BG = {
    x1: 0, 
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

const drawBackground = () => {
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
}

const playerL = new Image();
playerL.src = 'sprites/player_left.png';
const playerR = new Image();
playerR.src = 'sprites/player_right.png';
const spacestation = new Image();
spacestation.src = 'sprites/spacestation.png';

let gameOver = false;

let gameFrame = 0;

let score = 0;
let highScore = localStorage.getItem('highscore1') || 0;
highscore.textContent = "High Score: " + highScore;

const checkRecordScore = () => {
    if(score > localStorage.getItem('highscore1')){
        localStorage.setItem('highscore1', score);
        highScore = score;
        highscore.textContent = "High Score: " + highScore;
    }
}

ctx.font = '50px Georgia';

let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
};

canvas.addEventListener('mousedown', (event) => {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})

canvas.addEventListener('mouseup', () => {
    mouse.click = false;
})

class Player{
    constructor(){
        let me = this;
        me.x = canvas.width / 2;
        me.y = canvas.height / 2;
        me.radius = 10;
        me.frameX = 0;
        me.frameY = 0;
        me.frame = 0;
        me.width = 50;
        me.height = 50;
        me.angle = 0;
    }

    update(){
        let dx = this.x - 25 - mouse.x;
        let dy = this.y - 25 - mouse.y;

        let radAngle  = Math.atan2(dy, dx);

        this.angle = radAngle;

        if(mouse.x != this.x){
            this.x -= dx/20;
        }
        if(mouse.y != this.y){
            this.y -= dy/20;
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
        ctx.drawImage(spacestation, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

const game = { //thinking of changing object name to game due to it's interaction with all classes.

    enemyArray: [],

    gateArray: [],

    //Enemies will spawn from a different corner each time
    //corners are numbered clockwise starting from the top left
    enemySpawnLoc: [
        {x: 100, y: 100},
        {x: canvas.width - 100, y: 100},
        {x: 100, y: canvas.height - 100},
        {x: canvas.width - 100, y: canvas.height - 100}
    ],

    gameLoop: function(){

        player.update();
        player.draw();

        if(gameFrame % 50 == 0){
            //every 50 frames a new enemy spawns at a random corner
            this.enemyArray.push(new Enemy(this.enemySpawnLoc[Math.floor(Math.random() * 4)]['x'], this.enemySpawnLoc[Math.floor(Math.random() * 4)]['y']));
        }
        
        if(gameFrame % 250 == 0){
            //gates not spawning at x,y outlined below, all appearing around (600, 150)
            this.gateArray.push(new Gate(random(0, 1000), random(0, 666)));
        }


        for(let i = 0; i < this.enemyArray.length; i++){
            this.enemyArray[i].update();

            if(this.enemyArray.length > 1){
                for(let j = 0; j < this.enemyArray.length; j++){
                    this.enemyArray[i].intersects(this.enemyArray[j]);
                }
            }

            this.enemyArray[i].draw();
        }
    
        for(let i = 0; i < this.gateArray.length; i++){
            this.gateArray[i].update();
             this.gateArray[i].draw();

            if(this.gateArray.indexOf(this.gateArray[i]) % 2){ //changing the rotation every second gate
                this.gateArray[i].changeRotation();
            }

            if(this.gateArray[i].distance < (player.radius * 3)){ //when player passes through gate, enemies with distance < 200 are killed
                for(let j = 0; j < this.enemyArray.length; j++){
                    if(this.enemyArray[j].distance < 200){
                        this.enemyArray[j].dead = true;
                        this.enemyArray.splice(j, 1);
                        j--;
                        score += 50;
                    }
                }
                this.gateArray.splice(i, 1); //gate is removed once passed through
                i--;
                score += 25;
            }

            for(let k = 0; k < this.enemyArray.length; k++){
                if(this.enemyArray[k].distance < this.enemyArray[k].radius / 2 + player.radius){
                    gameOver = true; //if enemy gets too close, game over!
                }
            }
        }
        
    },

    speedUp: function(){
        for(let i = 0; i < this.enemyArray.length; i++){
            this.enemyArray[i].speed + 1; //increases enemy speed
        }
    }
}

class Enemy{
    constructor(_x, _y){
        let me = this;
        me.x = _x;
        me.y = _y;
        me.radius;
        me.dead = false;
        me.distance;
        me.touching = false;
        me.speed = 2;
        me.xVel = 0;
        me.yVel = 0;
        me.frameX = 0;
        me.frameY = 0;
        me.frame = 0;
        me.width = 40;
        me.height = 40;
        me.img = new Image();
    }

    update(){
        this.radius = Math.sqrt(this.width * this.width + this.height * this.height) / 2;

        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let honeAngle = Math.atan2(dy, dx);

        //tracks player
        this.x += this.speed * Math.cos(honeAngle);
        this.y += this.speed * Math.sin(honeAngle);

        //calculates the distance from the player
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }

    draw(){
        ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.img.src = 'sprites/enemy.png';
    }

    intersects(drone){
        let distance = Math.sqrt((this.x - drone.x)*(this.x - drone.x) + (this.y - drone.y)*(this.y - drone.y));

        let totalRad = this.radius + drone.radius;

        if(distance < totalRad){
            let overlap = totalRad - distance;

            let dx = (this.x - drone.x) / distance;
            let dy = (this.y - drone.y) / distance;

            this.x += overlap * dx;
            this.y += overlap * dy;
        }

    }
}

class Gate{
    constructor(_x, _y){
        let me = this;
        me.x = _x; //sprite hitbox is only the top-left corner of the square, withdrawing width & height /2
        me.y = _y;
        me.endX;
        me.endY;
        me.radius;
        me.distance;
        me.width = 75;
        me.height = 133;
        me.theta;
        me.rotation = 0;
        me.rotationSpeed = random(0.02, 0.03);
        me.img = new Image();
    }

    changeRotation(){
        this.x = this.radius * Math.cos(-this.theta);
        this.y = this.radius * Math.sin(-this.theta);
    }

    update(){
        //rotational velocity added to rotation angle (radians)
        this.rotation += this.rotationSpeed;

        //rotation angle in degrees
        this.theta = this.rotation * Math.PI / 180;

        //radius of rotation equals the rectangle's hypotenus 
        this.radius = Math.sqrt(this.x * this.x + this.y * this.y);
        
        //using linear rotational transformation to find x,y after rotation
        this.x = this.radius * Math.cos(this.theta);
        this.y = this.radius * Math.sin(this.theta);
        
        let dx = player.x - this.x - 37.5; //sprite hitbox relocation fixed
        let dy = player.y - this.y - 66.5;    

        //calculates the distance from player using new x,y
        this.distance = Math.sqrt(dx*dx + dy*dy);
    } 

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
        ctx.restore();
        this.img.src = 'sprites/gate5.png';
    }
}

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

/* const collisionCircle = (i, j) => {
        let vx = i.x - j.x;
        let vy = i.y - j.y;

        let mag = vx * vx + vy * vy;

        let totalRad = i.radius + j.radius;

        return mag < (totalRad * totalRad);
    }

const noOverlap = (i, j) => {
        let vx = i.x - j.x;
        let vy = i.y - j.y;

        let mag = vx * vx + vy *vy;

        let totalRad = i.radius + j.radius;

        if(collisionCircle(i, j)){
            let overlap = totalRad - mag;

            let dx = vx / mag;
            let dy = vy / mag;

            i.x += overlap * dx;
            i.y += overlap * dy;
        }
    } */

const player = new Player();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    game.gameLoop();

    //game speed increases with score

    /*if(score > 8000){
        game.speedUp();
    }else if(score > 6000){
        game.speedUp();
    }else if(score > 4000){
        game.speedUp();
    }else if(score > 2000){
        game.speedUp();
    }else if(score > 1000){
        game.speedUp();
    } */
        
    if(gameOver){
        ctx.fillStyle = 'red';
        ctx.fillText('Score: '+ score + ` (${highScore})`, 10, 50, 200, 100);
        ctx.fillText((gameFrame/60).toFixed(2), canvas.width - 125, 50);
        console.log(gameFrame); //uses gameframe as score counter
        checkRecordScore();
    }else{
        ctx.fillStyle = 'green';
        ctx.fillText((gameFrame/60).toFixed(2), canvas.width - 125, 50);
        ctx.fillText('Score: '+ score + ` (${highScore})`, 10, 50, 200, 100);
        gameFrame++;
    }
    //creates animation loop through recursion
    if(!gameOver){
        requestAnimationFrame(animate);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
  animate();
});
