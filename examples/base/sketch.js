function setup() {
  let canvas = createCanvas(400, 400);

  projectInSphere({ canvas });
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
