//window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var win_w = window.innerWidth;
    var win_h = window.innerHeight;
    var timmer;
    var isShaked = false;
    canvas.width = win_w;
    canvas.height = win_h;
    window.requestAnimFrame = window.requestAnimationFrame || 
                              window.webkitRequestAnimationFrame || 
                              window.mozRequestAnimationFrame || 
                              window.oRequestAnimationFrame || 
                              window.msRequestAnimationFrame;
    var isPlaying = true;
    var radio = 1;


    if(typeof(requestAnimationFrame) == 'undefined'){ // 手机不支持requestAnimationFrame时将画布整体大小缩小一半
        radio = 0.5;
        win_w = window.innerWidth*radio;
        win_h = window.innerHeight*radio;
        canvas.width = win_w;
        canvas.height = win_h;
    }

    var star = new star();
    var  Me = new me();
    var people = new people();

    

    function reset(){
        Me.init();
        star.init();
        people.init();
        document.getElementById('score').innerHTML = '0';
    }

    function loop(){   // loop function 
        ctx.clearRect(0,0,win_w,win_h);
        draw_bg();
        Me.draw();
        star.draw();
        people.draw();
        
        if(isPlaying && typeof(requestAnimationFrame) == 'function' ){
            timmer = requestAnimationFrame(loop);
        }
    }

    if(typeof(requestAnimationFrame) == 'undefined' && isPlaying){ 
        timmer = setInterval(loop,20);// 手机不支持requestAnimationFrame时用setInterval替代此时为了更好的渲染效果将画布整体大小缩小一半（不然卡到死）
    }

    
    

    function draw_bg(){
        ctx.drawImage(document.getElementById('bg'),0,0,win_w,win_h);
    }

function shake(){
    if(!isShaked){
        isShaked = true;
        canvas.className = 'ani-shake';
        setTimeout(function(){
            canvas.className = '';
        },120)
    }
    isShaked = false;
}

document.addEventListener('touchstart',function(e){
    e.preventDefault();
})
canvas.addEventListener('touchmove',function(e){
    var touch = e.changedTouches[0];
    Me.toX = touch.clientX;
    Me.toY = touch.clientY;
    Me.isMove = true;
});

canvas.addEventListener('touchstart',function(e){
    var touch = e.changedTouches[0];
    Me.toX = touch.clientX;
    Me.toY = touch.clientY;
    Me.isMove = true;
});

window.onload = function(){
    loop();
}
//}