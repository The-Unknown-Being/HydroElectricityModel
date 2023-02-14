rot = -1;
class Turbine{
  constructor(x,y,r,stand){
    this.x = x;
    this.y = y;
    this.r = r;
    // stand is 0 to show the stand ,and 1 to not show the stand
    this.s = stand;
    this.b = 0;
    this.rc = 200; // more means less rotation of turbine
  }
  show(){
    fill(255);
    noStroke();
    circle(this.x,this.y,0.3*this.r);
    noFill();
    stroke(255);
    strokeWeight(4);
    circle(this.x,this.y,2*this.r);
    strokeWeight(2);
    let numOfSticks = 6;
    let a = 0;  //angle for making lines
    push();
    if(rot == 1){
      translate(this.x,this.y);
      rotate(this.b);
    }
    beginShape();
    if(rot == 1){
      translate(-this.x,-this.y);
    }
    while(a <= TWO_PI){
      let x0 = cos(a)*this.r+this.x;
      let y0 = sin(a)*this.r+this.y;
      line(this.x,this.y,x0,y0);
      a += TWO_PI/numOfSticks;
    }
    endShape();
    pop();
    if(rot ==1){
      this.b+=TWO_PI/this.rc;
    }
    if(this.s == 0){
      beginShape();
      let x0 = this.x;
      let y0 = this.y+this.r*2;
      strokeWeight(3);
      line(this.x,this.y,x0,y0);
      endShape();
    }
  }
}
class Generator{
  constructor(s){
    this.x = s.x*0.95;
    this.y = s.y+3.5*s.r;
    this.w = s.r*3;
    this.h = s.r*2;    
    this.p0x = cos(radians(-70))*this.h/2+this.x-this.w/2;
    this.p1x = cos(radians(-70))*this.h/2+this.x+this.w/2;
    this.p2x = cos(radians(110))*this.h/2+this.x+this.w/2;
    this.p3x = cos(radians(110))*this.h/2+this.x-this.w/2;
    this.uy = sin(radians(-70))*this.h/2+this.y-this.h/2;
    this.by = sin(radians(-70))*this.h/2+this.y+this.h/2;
  }
  show(){
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(4);
    line(this.p0x,this.uy,this.p1x,this.uy);// upper line
    line(this.p1x,this.uy,this.p2x,this.by);// right side line
    line(this.p2x,this.by,this.p3x,this.by);// down line
    line(this.p3x,this.by,this.p0x,this.uy);// left side line
    
    line(this.p3x,this.by,this.p3x,this.by+this.h/2);
    line(this.p3x,this.by+this.h/2,this.p2x,this.by+this.h/2);
    line(this.p2x,this.by,this.p2x,this.by+this.h/2);
    line(this.p2x,this.by+this.h/2,this.p1x,this.uy+this.h/2);
    line(this.p1x,this.uy,this.p1x,this.uy+this.h/2);
    endShape();
    strokeWeight(3);
    stroke(255,165,0);
    if(rot == 1){
        stroke(255,0,0);
    }
    //wires
    beginShape();
    vertex(this.p3x+this.w/4,(this.by+this.by+this.h/2)/2);
    vertex(this.p3x+this.w/4,(this.by+this.by+this.h/2)/2+this.w/2);
    vertex(this.p3x+this.w/4+this.w*1.5,(this.by+this.by+this.h/2)/2+this.w/2);
    vertex(this.p3x+this.w/4+this.w*2.3,(this.by+this.by+this.h/2)/2+this.w/2);
    endShape();
    beginShape();
    vertex(this.p2x-this.w/4,(this.by+this.by+this.h/2)/2);
    vertex(this.p2x-this.w/4,(this.by+this.by+this.h/2)/2+this.w/3);
    vertex(this.p2x-this.w/4+this.w,(this.by+this.by+this.h/2)/2+this.w/3);
    vertex(this.p2x-this.w/4+this.w*1.8,(this.by+this.by+this.h/2)/2+this.w/3);
    endShape();
    stroke(255);
  }
}

class Shaft{
  constructor(t){
    this.x = t.x+2*t.r;
    this.y = t.y+t.r/1.5;
    this.r = t.r/4;
    this.t = new Turbine(this.x,this.y,this.r,1);
    this.t.rc = t.rc/3;
  }
  show(){
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(4);
    circle(this.x,this.y,2*this.r);
    this.t.show();
    endShape();
    beginShape();
    strokeWeight(3);
    let x0 = cos(radians(110))*this.r*1.55+this.x;
    let y0 = sin(radians(110))*this.r*1.55+this.y;
    line(this.x,this.y,x0,y0);
    endShape();
    
    
  }
}
class Chain{
  constructor(t,s){
    //t is for turbine
    //s is for shaft
    this.t = t;
    this.s = s;
  }
  show(){
    stroke(0,0,180,80);
    strokeWeight(2);
    let x0 = cos(radians(-60))*this.s.r+this.s.x;
    let y0 = sin(radians(-60))*this.s.r+this.s.y;
    let x1 = cos(radians(-60))*this.t.r+this.t.x;
    let y1 = sin(radians(-60))*this.t.r+this.t.y;
    line(x0,y0,x1,y1);
    x0 = cos(radians(90))*this.s.r+this.s.x;
    y0 = sin(radians(90))*this.s.r+this.s.y;
    x1 = cos(radians(90))*this.t.r+this.t.x;
    y1 = sin(radians(90))*this.t.r+this.t.y;
    line(x0,y0,x1,y1);
    stroke(255);
  }
}
class Transformer{
    constructor(g,st){
        // st means the type of transformer(step up or step down), 0 = step down and 1 = step up
        this.g = g;
        this.w = g.w*2;
        this.h = g.h*3;
        this.x = g.x + g.w*3;
        this.y = g.y;
        this.st = st;
    }
    show(){
        rectMode(CENTER);
        noFill();
        stroke(255);
        beginShape();
        rect(this.x,this.y,this.w,this.h);
        rect(this.x,this.y,this.w-this.w/3,this.h-this.h/3);
        endShape();
        beginShape(LINES);
        stroke(255,165,0);
        if(rot == 1){
            stroke(255,0,0);
        }
        if(this.st == 1){
            let a =0;
            let most = 10;
            for(let i=0; i < most; i++){
                vertex(this.x-this.w/2,this.y-this.h/5+a);
                vertex((this.x-this.w/3),this.y-this.h/5+a);
                a+=(this.h/3/most);
            }
            a=0;
            for(let i=0; i < int(1.5*most); i++){
                vertex(this.x+this.w/2,this.y-this.h/5+a);
                vertex((this.x+this.w/3),this.y-this.h/5+a);
                a+=(this.h/3/most);
            }
        }
        else {
            let a =0;
            let most = 10;
            for(let i=0; i < most; i++){
                vertex(this.x-this.w/2,this.y-this.h/5+a);
                vertex((this.x-this.w/3),this.y-this.h/5+a);
                a+=(this.h/3/most);
            }
            a=0;
            for(let i=0; i < int(0.75*most); i++){
                vertex(this.x+this.w/2,this.y-this.h/5+a);
                vertex((this.x+this.w/3),this.y-this.h/5+a);
                a+=(this.h/3/most);
            }
        }

        endShape();
    }
    downAdjust(tl){
        this.x = tl.x+tl.b*1.5;
        this.y = tl.y-tl.h/3;
        stroke(255,165,0);
        if(rot == 1){
            stroke(255,0,0);
        }
        strokeWeight(3);
        //left side wires
        beginShape();
        vertex(this.x-this.w/2,this.y-this.h/3);
        vertex(this.x-this.w*1.5,this.y-this.h/3);
        endShape();
        beginShape();
        vertex(this.x-this.w/2,this.y-this.h/2.65);
        vertex(this.x-this.w*1.5,this.y-this.h/2.65);
        endShape();
        //right side wires
        beginShape();
        vertex(this.x+this.w/2,this.y+this.h/3.2);
        vertex(this.x+this.w*1.7,this.y+this.h/3.2);
        endShape();
        beginShape();
        vertex(this.x+this.w/2,this.y+this.h/2.65);
        vertex(this.x+this.w*1.5,this.y+this.h/2.65);
        endShape();
        //right below going wires
        beginShape();
        vertex(this.x+this.w*1.7,this.y+this.h/3.2);
        vertex(this.x+this.w*1.7,this.y+this.h*4);
        endShape();
        beginShape();
        vertex(this.x+this.w*1.5,this.y+this.h/2.65);
        vertex(this.x+this.w*1.5,this.y+this.h*3.9);
        endShape();
        //towards the house lights wire
        beginShape();
        vertex(this.x+this.w*1.7,this.y+this.h*4);
        vertex(this.x-this.w*1.7,this.y+this.h*4);
        vertex(this.x-this.w*1.7,this.y+this.h*5);
        endShape();
        beginShape();
        vertex(this.x+this.w*1.5,this.y+this.h*3.9);
        vertex(this.x-this.w*1.9,this.y+this.h*3.9);
        vertex(this.x-this.w*1.9,this.y+this.h*5);
        endShape();
    }
}
class Transmission{
    constructor(t){
        this.x = t.x + t.w*3;
        this.y = t.y-t.h/2;
        this.b = t.w;
        this.h = 2*t.h;
        this.p0 = createVector(this.x,this.y-this.h/2);
        this.p1 = createVector(this.x-this.b/2,this.y+this.h/2);
        this.p2 = createVector(this.x+this.b/2,this.y+this.h/2);
    }
    show(){
        stroke(255);
        strokeWeight(4);
        noFill();
        beginShape();
            vertex(this.p0.x,this.p0.y);
            vertex(this.p1.x,this.p1.y);
            vertex(this.p2.x,this.p2.y);
        endShape(CLOSE);
        beginShape();
            vertex(this.p1.x,this.p1.y);
            vertex((this.p0.x+this.p2.x)/2,(this.p0.y+this.p2.y)/2);
            vertex(((this.p0.x+this.p1.x)/2+this.p0.x)/2,((this.p0.y+this.p1.y)/2+this.p0.y)/2)
        endShape(CLOSE);
        beginShape();
            vertex(this.p2.x,this.p2.y);
            vertex((this.p0.x+this.p1.x)/2,(this.p0.y+this.p1.y)/2);
            vertex(((this.p0.x+this.p2.x)/2+this.p0.x)/2,((this.p0.y+this.p2.y)/2+this.p0.y)/2)
        endShape(CLOSE);


        stroke(255,165,0);
        if(rot == 1){
            stroke(255,0,0);
        }
        strokeWeight(3);
        beginShape();
            vertex(this.x,this.p0.y);
            vertex(this.x-this.b/1.1,this.p0.y);
            vertex(this.x-this.b/1.1,this.p0.y+this.h/1.15);
            vertex(this.x-this.b*2.5,this.p0.y+this.h/1.15);
        endShape();
        beginShape();
            vertex(this.x,this.p0.y/1.2);
            vertex(this.x-this.b,this.p0.y/1.2);
            vertex(this.x-this.b,this.p0.y+this.h/1.2);
            vertex(this.x-this.b*2.5,this.p0.y+this.h/1.2);
        endShape();
        stroke(255);
        fill(255);
        circle(this.p0.x,this.p0.y,this.b/10);
        noFill();
    }
    
}
class StreetLight{
    constructor(t,tl){
        this.x = (t.x+tl.x)/2;
        this.y = tl.p1.y+tl.h/2;
        this.r = t.w/2;
    }
    show(){
        stroke(255);
        strokeWeight(3);
        noFill();
        if(rot == 1){
            fill(255,255,0);
        }
        circle(this.x,this.y,this.r*2);
        stroke(0,255,0);
        if(rot == 1){
            stroke(255,0,0);
        }
        beginShape();
        vertex(cos(radians(-120))*this.r+this.x,sin(radians(-120))*this.r+this.y);
        vertex(cos(radians(-120))*this.r+this.x,sin(radians(-120))*this.r+this.y-this.r*1.6);
        endShape();
        beginShape();
        vertex(cos(radians(-60))*this.r+this.x,sin(radians(-60))*this.r+this.y);
        vertex(cos(radians(-60))*this.r+this.x,sin(radians(-60))*this.r+this.y-this.r*1.8);
        endShape();
        
    }
}
class HouseLights{
    constructor(t){
        this.x = t.x+t.w;
        this.y = t.y+t.w*3.2;
        this.r = t.w/4;
    }
    show(){
        stroke(255);
        strokeWeight(3);
        noFill();
        if(rot == 1){
            fill(255,255,0);
        }
        let cx = this.x;
        let cy = this.y;
        let dx = this.r*2+this.r/2;
        for(let i=0; i < 3;i++){
            stroke(255);
            circle(cx,cy,2*this.r);
            stroke(0,255,0);
            if(rot ==1){
                stroke(255,0,0);
            }
            beginShape();
            vertex(cos(radians(120))*this.r+cx,sin(radians(120))*this.r+cy);
            vertex(cos(radians(120))*this.r+cx,sin(radians(120))*this.r+cy+this.r*1.9);
            endShape();
            beginShape();
            vertex(cos(radians(60))*this.r+cx,sin(radians(60))*this.r+cy);
            vertex(cos(radians(60))*this.r+cx,sin(radians(60))*this.r+cy+this.r*2.3);
            endShape();
            cx -= dx;
        }
    }
}

function changeRotation(){
  rot *= -1;
}











