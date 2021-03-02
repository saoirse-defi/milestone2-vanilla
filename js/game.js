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
};

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
};

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
            let cornerIndex = Math.floor(Math.random() * 4);
            this.enemyArray.push(new Enemy(this.enemySpawnLoc[cornerIndex]['x'], this.enemySpawnLoc[cornerIndex]['y']));
        }
        
        if(gameFrame % 250 == 0){
            //gates not spawning at x,y outlined below, all appearing around (600, 150)
            this.gateArray.push(new Gate(random(0, 1000), random(0, 666)));
        }

        /*if(this.enemyArray.length > 1){
            this.swarm2();
        }*/

        for(let i = 0; i < this.enemyArray.length; i++){
            this.enemyArray[i].update();
            this.enemyArray[i].draw();

        }

        /* for(let i = 0; i < this.enemyArray.length; i++){
            setTimeout(() => {
                this.enemyArray[i].draw();
            }, 0);
        } */


        for(let i = 0; i < this.gateArray.length; i++){
            this.gateArray[i].update();
             this.gateArray[i].draw();


            if(this.gateArray[i].distance < (player.radius * 3)){ //when player passes through gate, enemies with distance < 200 are killed
                for(let m = 0; m < this.enemyArray.length; m++){
                    if(this.enemyArray[m].distance < 200){
                        this.enemyArray[m].dead = true;
                        this.enemyArray.splice(m, 1);
                        m--;
                        score += 50;
                    }
                }
                this.gateArray.splice(i, 1); //gate is removed once passed through
                i--;
                score += 25;
            }

            for(let k = 0; k < this.enemyArray.length; k++){
                if(this.enemyArray[k].distance < this.enemyArray[k].radius / 2 + player.radius){
                    //gameOver = true; //if enemy gets too close, game over!
                }
            }
        }
    
    },

    swarm: function(){ //Test function for overlap/swarm
            for(let i = 0; i = this.enemyArray.length; i++){
                this.enemyArray[i].update();
                this.enemyArray[i].draw();

                for(let j = 0; j = this.enemyArray.length; j++){
                    let distanceX = this.enemyArray[i].x - this.enemyArray[j].x; //distance between in the x axis
                    let distanceY = this.enemyArray[i].y - this.enemyArray[j].y; //distance between in the y axis
                    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY); //pythagorian to solve for distance between to objects
                    let diameter =  this.enemyArray[i].radius * 2;
                    let overlap = diameter - distance;
                    let dx = distanceX / distance;
                    let dy = distanceY / distance;

                    if(distance < diameter){
                        //this.enemyArray[j].spread(overlap, dx, dy);
                        this.enemyArray[j].x += overlap * dx;
                        this.enemyArray[j].y += overlap * dy;
                    }
                }
            }
    },

    swarm2: function(){ //Most promising swarm function yet
            for(let i = 0, j = this.enemyArray.length; i < j; i++){
                for(let j = 0, k = this.enemyArray.length; j < k; j++){
                    let vx = this.enemyArray[i].x - this.enemyArray[j].x;
                    let vy = this.enemyArray[i].y - this.enemyArray[j].y;
                    let prox = Math.sqrt(vx*vx + vy*vy);
                    let totalRad =  this.enemyArray[i].radius * 2;
                    let overlap = totalRad - prox;
                    let dx = vx / prox;
                    let dy = vy / prox;

                    if(prox < totalRad){
                        this.enemyArray[j].x += random(-1, 1);
                        this.enemyArray[j].y += random(-1, 1);
                        //creates nice swarm effect, could look like insects, unfortunately drags enemies away from player.
                    }
                }
            }
    },

    speedUp: function(){
        for(let i = 0; i < this.enemyArray.length; i++){
            this.enemyArray[i].speed + 1; //increases enemy speed
        }
    }
};

class Enemy{
    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
        this.radius = 20;
        this.diameter = 40;
        this.dead = false;
        this.distance;
        this.touching = false;
        this.speed = 2;
        this.xVel = 0;
        this.yVel = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.img = new Image();
    }

    update(){
        let me = this;

        let dx = player.x - me.x;
        let dy = player.y - me.y;
        let honeAngle = Math.atan2(dy, dx);

        //tracks player
        me.x += me.speed * Math.cos(honeAngle);
        me.y += me.speed * Math.sin(honeAngle);

        //calculates the distance from the player
        me.distance = Math.sqrt(dx*dx + dy*dy);
    }

    draw(){
        let me = this;
        
        ctx.drawImage(me.img, me.x - me.radius, me.y - me.radius, me.diameter, me.diameter);
        me.img.src = 'sprites/enemy.png';
    }

    intersects(drone){ //Test function for overlap/swarm
        let me = this;

        let distance = Math.sqrt((me.x - drone.x)*(me.x - drone.x) + (me.y - drone.y)*(me.y - drone.y));

        let totalRad = me.radius + drone.radius;

        if(distance < totalRad){
            let overlap = totalRad - distance;

            let dx = (me.x - drone.x) / distance;
            let dy = (me.y - drone.y) / distance;

            me.x += overlap * dx;
            me.y += overlap * dy;
        }

    }

    spread(overlap, dx, dy){ //Test function for overlap/swarm
        let me = this;

        me.x += overlap * dx;
        me.y += overlap * dy;
    }
};

class Gate{
    constructor(_x, _y){
        this.x = _x; //sprite hitbox is only the top-left corner of the square, withdrawing width & height /2
        this.y = _y;
        this.endX;
        this.endY;
        this.radius;
        this.distance;
        this.width = 75;
        this.height = 133;
        this.theta;
        this.rotation = random(0, 1);
        this.rotationSpeed = random(0.02, 0.035);
        this.img = new Image();
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
        
        let dx = player.x - me.x - 37.5; //sprite hitbox relocation fixed
        let dy = player.y - me.y - 66.5;    

        //calculates the distance from player using new x,y
        me.distance = Math.sqrt(dx*dx + dy*dy);
    } 

    draw(){
        let me = this;

        ctx.save();
        ctx.translate(me.x, me.y);
        ctx.rotate(me.rotation * Math.PI / 180);
        ctx.drawImage(me.img, 0, 0, me.width, me.height);
        ctx.restore();
        me.img.src = 'sprites/gate5.png';
    }
};

const random = (min, max) => {
    return Math.random() * ((max - min) + min);
};

const asyncForEach = (array, callback) => {
        array.forEach(() => {
            setTimeout(callback, 0);
        })
};

const collisionCircle = (i, j) => {
        let vx = i.x - j.x;
        let vy = i.y - j.y;

        let mag = vx * vx + vy * vy;

        let totalRad = i.radius + j.radius;

        return mag < (totalRad * totalRad);
};

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
};

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
};

document.addEventListener("DOMContentLoaded", function() { 
  animate();
});


