var people = function(){
    this.init();
}

people.prototype.init = function(){
    this.width = 100*radio;
    this.height = 100*radio;
    this.R = 200*radio;
    this.r = 50*radio;
    this.num = 2;
    this.all = 30;
    this.x = [];
    this.y = [];
    this.changeX = []; // 记录鼠标位置
    this.changeY = [];
    this.isTouch = []; // 判断是否和人物碰撞
    this.success = []; // 判断是否到达终点
    this.count = [];  // 到达终点后计数\
    this.attack = 10; // 攻击力
    this.interval = 50; // 设置到达终点切未被打飞的小人每n帧攻击一次
    this.pre = 200;
    this.score = 0;
    this.getScort = 10;

    for(var i=0;i<this.all; i++){
        this.born(i);
    }
    //this.draw();
}

people.prototype.level = function(score){ // 难度设置
    // if(this.score > 100 && this.sc ){ // 难度提升
    //     this.num = 4;
    //     this.pre = 200;
    // }
    if(score > 150){
        this.num = parseInt(score/50);
        this.pre -=  parseInt(score/1000);
    } 
    

}

people.prototype.draw = function(){

    this.level(this.score); 

    for(var i=0;i<this.num;i++){
        ctx.drawImage(document.getElementById('me'),this.changeX[i]-this.width/2,this.changeY[i]-this.height/2,this.width,this.height);
        ctx.fillRect(this.changeX[i]-this.width/2,this.changeY[i]-this.height/2,this.width,this.height);
        this.boom(i);
        this.add(i);
        //console.log(this.changeX[i],)
    }
    
}

people.prototype.born = function(i){
    var x = Math.random() - 0.5;
    if(x > 0){
        this.x[i] = x * 200 +  win_w ;
    }else{
        this.x[i] = x * 200
    }
    var y = Math.random() - 0.5;
    if(y>0){
        this.y[i] = y*200+win_h;
    }else{
        this.y[i] = y*200
    }
    //this.x[i] = (Math.random() - 0.5) * 2000 + win_w/2; 
    //this.y[i] = (Math.random() - 0.5) * 2000 + win_h/2;
    this.changeX[i] = this.x[i];
    this.changeY[i] = this.y[i];
    this.isTouch[i] = false; 
    this.success[i] = false;
    this.count[i] = 0;
}

people.prototype.boom = function(i){
    var x = (win_w/2 - this.changeX[i]);
    var y = (win_h/2 - this.changeY[i]);
    var x1 = (Me.x - this.changeX[i]);
    var y1 = (Me.y - this.changeY[i]);
    if(Math.sqrt(x1*x1 + y1*y1) < this.r + Me.r){ // 碰撞检测人物之间
        if(!this.isTouch[i]){  // 获取得分
            this.score += this.getScort;
            document.getElementById('score').innerHTML = this.score;
            shake(); // 震动
        }
        this.isTouch[i] = true;
    }

    if(!this.isTouch[i]){ 
        if(Math.sqrt(x*x + y*y) > this.R + this.r ){
            this.changeX[i] += (win_w/2 - this.x[i])/this.pre;
            this.changeY[i] += (win_h/2 - this.y[i])/this.pre;
        }else{
            if(!this.success[i]){
                star.nowLife = star.nowLife > this.attack ? star.nowLife - this.attack : 0;
                this.success[i] = true;
            }else{
                this.count[i] += 1;
                if(this.count[i] == this.interval){
                    this.count[i] = 0;
                    star.nowLife = star.nowLife > this.attack ? star.nowLife - this.attack : 0;
                }
            }
            
        }
    }else{
        this.changeX[i] -= (win_w/2 - this.x[i])/this.pre*5;
        this.changeY[i] -= (win_h/2 - this.y[i])/this.pre*5;
    }
}

people.prototype.add = function(i){
    if(this.isTouch[i]){
        if(this.changeX[i] < -this.width || this.changeX[i] > win_w || this.changeY[i] < -this.height || this.changeY[i] > win_h ){
            this.born(i);
        }
        
    }
}