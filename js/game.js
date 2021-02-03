const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = 1000;
canvas.height = 600;

let gameOver = false;

let gameFrame = 0;

let score = 0;

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
    console.log(mouse.x, mouse.y);
})

canvas.addEventListener('mouseup', () => {
    mouse.click = false;
})

const playerImg = new Image();
playerImg.src = 'sprites/player.png';

class Player{
    constructor(){
        let me = this;
        me.x = canvas.width / 2;
        me.y = canvas.height / 2;
        me.radius = 10;
        me.frameX = 0;
        me.frameY = 0;
        me.frame = 0;
        me.spriteWidth = 500;
        me.spriteHeight = 500;
    }

    update(){
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;

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

        //draw circle around player
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
}

const enemies = { //thinking of changing object name to game due to it's interaction with all classes.

    enemyArray: [],

    gateArray: [],

    //enemies will spawn from a different corner each time
    //corners are numbered clockwise starting from the top left
    enemySpawnLoc: [
        {x: 100, y: 100},
        {x: canvas.width - 100, y: 100},
        {x: 100, y: canvas.height - 100},
        {x: canvas.width - 100, y: canvas.height - 100}
    ],

    gateSpawnLoc: {x: canvas.width - 200, y: canvas.height - 200},

    handleEnemy: function(){

        if(gameFrame % 50 == 0){
            //every 50 frames a new enemy spawns at a random corner
            this.enemyArray.push(new Enemy(this.enemySpawnLoc[Math.floor(Math.random() * 4)]['x'], this.enemySpawnLoc[Math.floor(Math.random() * 4)]['y']));
        }
    
        for(let i = 0; i < this.enemyArray.length; i++){
            this.enemyArray[i].update();
            this.enemyArray[i].draw();
        }
    
        for(let i = 0; i < this.enemyArray.length; i++){
            for(let j = 0; j < this.gateArray.length; j++){
                if(this.gateArray[j]){
                    if(this.gateArray[j].distance < player.radius && this.enemyArray[i].distance < 1000){
                        for(let k = 0; k < this.enemyArray.length; k++){
                            this.enemyArray[k].dead = true;
                            this.enemyArray.splice(k, 1);
                            this.gateArray.splice(j, 1);
                            score += 50;
                        }
                    }
                }
            }
            //ends game once collision is detected
            if(this.enemyArray[i]){
                if(this.enemyArray[i].distance < this.enemyArray[i].radius + player.radius){
                    gameOver = true;
                }  
            }
        }        
        
    },

    handleGate: function(){
        if(gameFrame % 150 == 0){
            this.gateArray.push(new Gate(Math.random() * (canvas.width - 300), Math.random() * (canvas.height - 300)));
        }
        for(let i = 0; i < this.gateArray.length; i++){
            this.gateArray[i].update();
            this.gateArray[i].draw();
        }
    },

    /*draw: function(){
        for(let j = 0; j < this.enemyArray.length; j++){
            this.enemyArray[j].draw();
        }
    },*/

    noverlap: function(){
        // not functional yet
        for(let m = 0; m < this.enemyArray.length; m++){
            for(let n = 0; n < this.enemyArray[m].length; n++){
                noOverlap(this.enemyArray[m], this.enemyArray[n]);
            }
        }
    }
}

class Enemy{
    constructor(x, y){
        let me = this;
        me.x = x;
        me.y = y;
        me.radius = 10;
        me.dead = false;
        me.distance;
        me.speed = 3;
        me.xVel = 0;
        me.yVel = 0;
        me.frameX = 0;
        me.frameY = 0;
        me.frame = 0;
        me.spriteWidth = 500;
        me.spriteHeight = 500;
    }

    update(){
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

class Gate{
    constructor(x, y){
        let me = this;
        me.x = x; //sprite hitbox is only the top-left corner of the square, withdrawing width & height /2
        me.y = y;
        me.radius = 30;
        me.distance;
        me.width = 40;
        me.height = 40;
    }

    update(){
        let dx = player.x - this.x - 20;
        let dy = player.y - this.y -20;        
        this.distance = Math.sqrt(dx*dx + dy*dy);
    } 

    draw(){
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
}


const collisionCircle = (i, j) => {
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
    }

const player = new Player();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    enemies.handleEnemy();
    enemies.handleGate();
    enemies.noverlap();

    player.update();
    player.draw();

    if(gameOver){
        ctx.fillStyle = 'red';
        ctx.fillText('Score: '+ score, 10, 50, 200, 100);
        ctx.fillText((gameFrame/60).toFixed(2), canvas.width - 125, 50);
        console.log(gameFrame); //uses gameframe as score counter
    }else{
        ctx.fillStyle = 'green';
        ctx.fillText((gameFrame/60).toFixed(2), canvas.width - 125, 50);
        ctx.fillText('Score: '+ score, 10, 50, 200, 100);
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
