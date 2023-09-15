function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(225);
  cross(width / 2, height / 2, 240, millis() / 50000, 5);
}

function cross(x, y, s, r, l) {
  push();
  translate(x, y)
  rotate(r);
  stroke(120 - 1 * 50, 1 * 20, 150, 80);
  strokeWeight(s / 25);
  line(-s / 2, 0, s / 22, 0);
  line(0, -s / 2, 0, s / 2);
  
  if(l > 0) {
    cross(-s / 2, 0, s*0.66, r, l- 1);
    cross(0, -s / 2, s*0.66, r, l- 1);
    cross(s / 2, 0, s*0.66, r, l- 1);
    cross(0, s / 2, s*0.66, r, l- 1);
  }
  pop();
  }