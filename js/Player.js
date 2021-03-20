export class Player{
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
