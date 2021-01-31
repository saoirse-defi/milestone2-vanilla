const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = 900;
canvas.height = 600;

let score = 0;
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
        this.width = canvas.width / 2;
        this.height = canvas.height / 2;
        this.radius = 10;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 500;
        this.spriteHeight = 500;
    }

    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        if(mouse.x != this.x){
            this.x -= dx/30;
        }
        if(mouse.y != this.y){
            this.y -= dy/30;
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
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}


const player = new Player();

const animate = () => {
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update();
    player.draw();

    gameFrame++;
    //creates animation loop through recursion
    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", function() { 
  animate();
});
