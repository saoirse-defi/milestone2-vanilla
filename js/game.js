const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
console.log(ctx);
const scoreboard = document.getElementById('score');

canvas.width = 900;
canvas.height = 600;

let score = 0;
scoreboard.innerHTML = `Score: ${score}`; //trying to implement scoreboard

let gameFrame = 0;

ctx.font = '50px Georgia';

let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

canvas.addEventListener('mousedown', (event) => {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
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
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

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

class Enemy{
    constructor(){
        let me = this;
        me.x = 100;
        me.y = 100;
        me.radius = 10;
        me.speed = 4;
        me.xVel = 0;
        me.yVel = 0;
        me.frameX = 0;
        me.frameY = 0;
        me.frame = 0;
        me.spriteWidth = 500;
        me.spriteHeight = 500;
    }

    update(){
        hone();
    }

    draw(){
        ctx.lineWidth = 0.2;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

const hone = () => {
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;
        let honeAngle = Math.atan2(dy, dx);

        enemy.x += enemy.speed * Math.cos(honeAngle);
        enemy.y += enemy.speed * Math.sin(honeAngle);
}

const player = new Player();
const enemy = new Enemy();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    enemy.update();
    enemy.draw();
    //drawSomething();
    gameFrame++;
    //creates animation loop through recursion
    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", function() { 
  animate();
});
