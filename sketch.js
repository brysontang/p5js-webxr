let texture;

// This is a basic p5.js sketch. Replace the drawing logic with your own art.
function setup() {
  createCanvas(600, 400);

  const p5Canvas = document.getElementById('defaultCanvas0');

  // Proceed with creating the texture from the p5.js canvas
  texture = new THREE.Texture(p5Canvas);
  texture.needsUpdate = true;

  // Initialize your Three.js scene here or trigger it to start using this texture
  initThree(); // Assume this function sets up Three.js and starts the render loop
}

function draw() {
  background(220);
  // Example art: a simple moving ellipse
  let x = frameCount % width;
  fill(255, 0, 0);
  ellipse(x, height / 2, 50, 50);

  noLoop();
}
