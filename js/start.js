const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = 1000;
canvas.height = 600;

const background = new Image();
background.src = 'sprites/stars.png';

const spacestation = new Image();
spacestation.src = 'sprites/spacestation.png';

const BG = {
    x1: 0, 
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

const drawBackground = () => {
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
};

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
});

canvas.addEventListener('mouseup', () => {
    mouse.click = false;
});

class Player{
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 10;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.width = 50;
        this.height = 50;
        this.angle = 0;
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
        ctx.drawImage(spacestation, 0 - me.width / 2, 0 - me.height / 2, me.width, me.height);
        ctx.restore();
    }
};

const player = new Player();

const startScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    ctx.font = '50px Orbitron'
    ctx.fillStyle = 'white';
    ctx.fillText('AGAINST ALL ODDS', canvas.width / 2 - 275, canvas.height / 2 - 100, 600, 200);
    
    ctx.font = '25px Orbitron'
    ctx.fillText('Click to move! Spacebar to start.', canvas.width / 2 - 225, canvas.height / 2 + 200, 900);

    player.update();
    player.draw();

    requestAnimationFrame(startScreen);
};

document.addEventListener("DOMContentLoaded", function() { 
  startScreen();
});

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        animate();
    }
}