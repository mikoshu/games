//window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var win_w = window.innerWidth;
    var win_h = window.innerHeight;
    canvas.width = win_w;
    canvas.height = win_h;

    var isPlaying = true;

    var  Me = new me();
    var star = new star();
    var people = new people();


    function loop(){   // loop function 
        ctx.clearRect(0,0,win_w,win_h);
        draw_bg();
        Me.init();
        star.init();
        people.draw();
        if(isPlaying){
            timmer = requestAnimationFrame(loop);
        }
    }

    function draw_bg(){
        ctx.drawImage(document.getElementById('bg'),0,0,win_w,win_h);
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