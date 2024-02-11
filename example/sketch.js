// This is a basic p5.js sketch. Replace the drawing logic with your own art.
function setup() {
  createCanvas(600, 400);

  const p5Canvas = document.getElementById('defaultCanvas0');

  // Initialize your Three.js scene here or trigger it to start using this texture
  projectInSphere(p5Canvas); // Assume this function sets up Three.js and starts the render loop
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  for (var i = 0; i < 2000; i++) {
    fill(rc());
    ellipse(random(width), random(height), 2, 2);
  }

  noLoop();
}

function rc() {
  return color(random(255), random(255), random(255));
}
