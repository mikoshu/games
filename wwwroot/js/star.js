var star = function(){
    this.r = 200;
    this.width = 200;
    this.height = 200;
    this.x = win_w/2;
    this.y = win_h/2;

}

star.prototype.init = function(){
    this.draw();
}

star.prototype.draw = function(){
    ctx.beginPath();

    ctx.strokeStyle = "blue";

    ctx.arc(this.x,this.y,this.r, 0, Math.PI*2, false);  
    
    ctx.stroke();

    ctx.drawImage(document.getElementById('star'),this.x - this.width/2,this.y - this.height/2,this.width,this.height);
}