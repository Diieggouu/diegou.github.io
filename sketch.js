let circle1, circle2;
let progressBarX;
let progress = 0;
let verificationPassed = false;

function setup() {
  createCanvas(500, 500);

  circle1 = new Circle(width / 4, height / 2, 50);
  circle2 = new Circle(width * 3 / 4, height / 2, 50);

  progressBarX = width / 2;
}

function draw() {
  background(255);

  circle1.display();
  circle2.display();

  if (circle1.isJoining) {
    circle1.x = lerp(circle1.x, circle2.x, 0.1);
  }

  let aligned = abs(circle1.x - circle2.x) < 10;
  if (aligned) {
    progress += 0.005;
  }

  if (verificationPassed) {
    fill(255, 182, 193); // Color rosa
    rect(progressBarX - 50, height / 2 - 10, 100, 20);
  } else {
    fill(255, 0, 0, 150); // Color rojo transparente
    rect(progressBarX - 50, height / 2 - 10, 100 * progress, 20);
  }

  if (progress >= 1 && aligned) {
    verificationPassed = true;
    circle1.isMoving = false;
    circle1.isJoining = false;
    circle2.isMoving = false;
  }

  if (!verificationPassed) {
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Mueve los círculos en la misma dirección y únelos para detener la barra.", width / 2, height - 50);
  } else {
    fill(0, 255, 0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("¡Verificado!", width / 2, height - 50);
  }
}

function mousePressed() {
  let dist1 = dist(mouseX, mouseY, circle1.x, circle1.y);
  let dist2 = dist(mouseX, mouseY, circle2.x, circle2.y);
  if (dist1 < circle1.radius && !circle1.isJoining) {
    circle1.isMoving = true;
  }
  if (dist2 < circle2.radius && !circle2.isJoining) {
    circle2.isMoving = true;
  }
}

function mouseReleased() {
  circle1.isMoving = false;
  circle2.isMoving = false;
  circle1.isJoining = true;
}

function mouseDragged() {
  if (circle1.isMoving) {
    circle1.x = mouseX;
  }
  if (circle2.isMoving) {
    circle2.x = mouseX;
  }
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isMoving = false;
    this.isJoining = false;
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

