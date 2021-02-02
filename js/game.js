const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = 900;
canvas.height = 600;

let score = 0;
let gameOver = false;

let gameFrame = 0;

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

const enemies = {

    enemyArray: [],

    //enemies will spawn from a different corner each time
    //corners are numbered clockwise starting from the top left
    corners: [
        {x: 100, y: 100},
        {x: canvas.width - 100, y: 100},
        {x: 100, y: canvas.height - 100},
        {x: canvas.width - 100, y: canvas.height - 100}
    ],

    spawnEnemy: function(){

        if(gameFrame % 50 == 0){
            //every 50 frames a new enemy spawns at a random corner
            this.enemyArray.push(new Enemy(this.corners[Math.floor(Math.random() * 4)]['x'], this.corners[Math.floor(Math.random() * 4)]['y']));
        }   
        for(let i = 0; i < this.enemyArray.length; i++){
            if(this.enemyArray[i].distance < this.enemyArray[i].radius + player.radius){
                gameOver = true;
            }
        
        this.enemyArray[i].update();
        }
    },

    draw: function(){
        for(let j = 0; j < this.enemyArray.length; j++){
            this.enemyArray[j].draw();
        }
    },

    noverlap: function(){
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

        this.x += this.speed * Math.cos(honeAngle);
        this.y += this.speed * Math.sin(honeAngle);

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
    enemies.spawnEnemy();
    enemies.noverlap();
    enemies.draw();

    player.update();
    player.draw();

    if(gameOver){
        ctx.fillStyle = 'red';
        ctx.fillText('Dead', 10, 50, 200, 100);
        ctx.fillText(gameFrame/60, canvas.width - 100, 50);
        console.log(gameFrame); //uses gameframe as score counter
    }else{
        ctx.fillStyle = 'green';
        ctx.fillText(gameFrame/60, canvas.width - 100, 50);
        ctx.fillText('Alive', 10, 50, 200, 100);
        gameFrame++;
    }
    //creates animation loop through recursion
    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", function() { 
  animate();
});
