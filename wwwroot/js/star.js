var star = function(){
    this.init();
}

star.prototype.init = function(){
    this.r = 200*radio;
    this.width = 130*radio;
    this.height = 200*radio;
    this.x = win_w/2;
    this.y = win_h/2;
    this.life = 150*radio;
    this.nowLife = 150*radio;
}

star.prototype.draw = function(){
    ctx.save();
    ctx.beginPath();

    ctx.strokeStyle = "blue";

    ctx.arc(this.x,this.y,this.r, 0, Math.PI*2, false);  
    
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
    ctx.drawImage(document.getElementById('star'),this.x - this.width/2,this.y - this.height/2,this.width,this.height);

    this.drawLine(this.life,'#666');
    this.drawLine(this.nowLife,'rgba(255,255,255,1)');
    this.lose();
}

star.prototype.drawLine = function(width,color){ // 绘制血条
    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 20 * radio;
    if(width != 0){
        ctx.lineCap="round";
    }
    ctx.moveTo(win_w/2 - this.life/2,win_h/2 - this.height/2 - 20);
    ctx.lineTo(win_w/2 - this.life/2 + width,win_h/2 - this.height/2 - 20);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
} 

star.prototype.lose = function(){
    if(this.nowLife == 0){
        alert('YOU LOSE !');
        reset(); // 重新开始
    }
}