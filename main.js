let width = 500;
let height = 500;
let x = 250;
let y = 250;
let per_frame = 120;
let go_left = false;
let go_right = false;
let go_top = false;
let go_bottom = false;
let moving_speed = 80;
let moving_interval = null;

const circles = [];
function Circle(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.deg = 0;
    this.crash = true;
}

let circle1 = new Circle(250,250,25);
let circle2 = new Circle(100,100,25);
let circle3 = new Circle(400,400,25);
circles.push(circle1);
circles.push(circle2);
circles.push(circle3);

function render() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0,0,width,height); // 캔버스를 비운다

        for(c of circles){
            var cp = new Path2D();
            cp.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            ctx.fill(cp);
        }
        
    }
}

setInterval(() => {
    render();
}, 1/per_frame);

render();


setInterval(()=>{
    for(c of circles){

        if(width <= c.x +25){
            c.crash = true;
        }
        if(0 >= c.y - 25){
            c.crash = true;
        }    
        if(0 >= c.x - 25){
            c.crash = true;
        }    
        if(height <= c.y + 25){
            c.crash = true;
        }    

        // const x1 = circle1.x;
        // const y1 = circle1.y;
        // const x2 = circle2.x;
        // const y2 = circle2.y;
        // const x3 = circle3.x;
        // const y3 = circle3.y;
        // const r12 = Math.sqrt((Math.max(x1,x2) - Math.min(x1,x2))^2 + (Math.max(y1,y2) - Math.min(y1,y2))^2);
        // if(r12 <= 50){
        //     circle1.crash = true;
        //     console.log(r12,"crash");
        // }
        // const r13 = Math.sqrt((Math.max(x1,x3) - Math.min(x1,x3))^2 + (Math.max(y1,y3) - Math.min(y1,y3))^2);
        // if(r13 <= 50){
        //     circle1.crash = true;
        //     console.log("crash");
        // }

        if(c.crash){
            c.deg = Math.random() * 360;
            c.deg = c.deg * (Math.floor(Math.random()*2) == 1 ? 1 : -1);
            c.crash = false;
        }
        const radian = c.deg * (Math.PI / 180);
        c.x = c.x + (1 * Math.cos(radian));
        c.y = c.y + (1 * Math.sin(radian));
    }
},1/80);

document.addEventListener('keydown',(e)=>{
    const key = e.key;
    if(key == 'd'){
        go_right = true;
    }
    if(key == 'w'){
        go_top = true;
    }
    if(key == 'a'){
        go_left = true;
    }
    if(key == 's'){
        go_bottom = true;
    }

    if(go_right || go_top || go_left || go_bottom){
        if(!moving_interval){
            moving_interval = setInterval(() => {
                if(go_right){
                    if(width > x +25){
                        x += 1;
                    }
                }    
                if(go_top){
                    if(0 < y - 25){
                        y -= 1;
                    }    
                }    
                if(go_left){
                    if(0 < x - 25){
                        x -= 1;
                    }    
                }    
                if(go_bottom){
                    if(height > y + 25){
                        y += 1;
                    }    
                }    
            }, 1/moving_speed);
        }
    }

});

document.addEventListener('keyup',(e)=>{
    const key = e.key;
    if(key == 'd'){
        go_right = false;
    }
    if(key == 'w'){
        go_top = false;
    }
    if(key == 'a'){
        go_left = false;
    }
    if(key == 's'){
        go_bottom = false;
    }

    if(!go_right && !go_top && !go_left && !go_bottom){
        if(moving_interval){
            clearInterval(moving_interval);
            moving_interval = null;
        }
    }

});


