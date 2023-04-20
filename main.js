
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
// cordinates
const A = {x:200, y:150};
const B = {x:150, y:250};
const C = {x:50, y:100};
const D = {x:250, y:200};
// draw lines
const ctx = myCanvas.getContext("2d");

let angle = 0;

const mouse = {x:0, y:0};

document.onmousemove=(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
}

animate();

function animate(){

    const radius = 50;
    A.x = mouse.x + Math.cos(angle) * radius;
    A.y = mouse.y - Math.sin(angle) * radius;
    B.x = mouse.x - Math.cos(angle) * radius;
    B.y = mouse.y + Math.sin(angle) * radius;

    angle += 0.01;

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.moveTo(C.x, C.y);
    ctx.lineTo(D.x, D.y);
    ctx.stroke();

    drawDot(A, "A");
    drawDot(B, "B");
    drawDot(C, "C");
    drawDot(D, "D");

    const I = getIntersection(A, B, C, D);
    if (I){
        drawDot(I, "I");
    }

    requestAnimationFrame(animate);
}

function getIntersection(A, B, C, D) {
    /*
    // Ix = Ax + (Bx - Ax)t = Cx + (Dx - Cx)u
    // Iy = Ay + (By - Ay)t = Cy + (Dy - Cy)u
    */

    const top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x -C.x) * (B.y - A.y);
    const t = top / bottom;

    if (bottom != 0){
        const t = top / bottom;
        if (t >= 0 && t <= 1){
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }        
        }
    }

    return null;
}

// linear interpolation
function lerp(A, B, t) {
    return A + (B - A) * t;
}

// draw dot function
function drawDot(point, label, isRed){
    ctx.beginPath();
    ctx.fillStyle = isRed? "red":"white";
    ctx.arc(point.x, point.y, 10, 0, Math.PI* 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 14px Arial";
    ctx.fillText(label, point.x, point.y);
}
