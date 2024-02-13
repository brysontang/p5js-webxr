let THREE = require('three');
let renderer; // Declare these variables globally

// Constants for the sphere geometry
const SPHERE_RADIUS = 5;
const SPHERE_WIDTH_SEGMENTS = 32;
const SPHERE_HEIGHT_SEGMENTS = 32;

// Constants for the camera
const CAMERA_FOV = 75;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;
const CAMERA_POSITION_Z = 10;

function validateOptions(options) {
  if (!options.canvas) {
    throw new Error('You must provide a canvas element');
  }
}

function createTexture(canvas) {
  const texture = new THREE.Texture(canvas.elt);
  texture.needsUpdate = true;
  return texture;
}

function createPerspectiveCamera() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    aspectRatio,
    CAMERA_NEAR,
    CAMERA_FAR
  );
  camera.position.z = CAMERA_POSITION_Z;
  return camera;
}

function createRenderer(showThreeJsCanvas) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (!showThreeJsCanvas) {
    renderer.domElement.style.display = 'none';
  }
  return renderer;
}

function createSphere(texture) {
  const geometry = new THREE.SphereGeometry(
    SPHERE_RADIUS,
    SPHERE_WIDTH_SEGMENTS,
    SPHERE_HEIGHT_SEGMENTS
  );
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  return new THREE.Mesh(geometry, material);
}

function addButton(canvas, callback) {
  let btn = createButton('Open VR');
  let canvasPosition = canvas.position();

  btn.position(canvasPosition.x + 10, canvasPosition.y + 10);

  btn.style('font-size', '16px');
  btn.mousePressed(() => {
    callback();
  });
}

function projectInSphere(options) {
  validateOptions(options);

  const defaults = {
    canvas: null,
    showThreeJsCanvas: false,
  };

  const settings = Object.assign({}, defaults, options);

  const texture = createTexture(settings.canvas);
  const scene = new THREE.Scene();
  const camera = createPerspectiveCamera();
  const renderer = createRenderer(settings.showThreeJsCanvas);
  document.body.appendChild(renderer.domElement);

  const sphere = createSphere(texture);
  scene.add(sphere);

  renderer.xr.enabled = true;
  renderer.setAnimationLoop(function () {
    texture.needsUpdate = true; // Make sure this line is within the animation loop
    renderer.render(scene, camera);
  });

  if ('xr' in navigator) {
    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
      if (supported) {
        addButton(settings.canvas, () => {
          // Request a session and start VR
          navigator.xr
            .requestSession('immersive-vr', {
              optionalFeatures: ['local-floor', 'bounded-floor'],
            })
            .then(onSessionStarted(renderer));
        });
      } else {
        console.log('Immersive VR not supported');
      }
    });
  } else {
    console.log('WebXR not supported');
  }
}

let xrSession = null;
let xrReferenceSpace = null;

function onSessionStarted(renderer) {
  return function onSessionStarted(session) {
    xrSession = session;
    renderer.xr.enabled = true;
    renderer.xr.setSession(session);

    session.addEventListener('end', onSessionEnded);

    session.requestReferenceSpace('local-floor').then((referenceSpace) => {
      xrReferenceSpace = referenceSpace;
    });

    // document.getElementById('enterVR').remove(); // Remove the button once in VR
  };
}

function onSessionEnded(event) {
  xrSession = null;
  renderer.xr.enabled = false;
  console.log('VR session ended');
  // Optionally, handle exiting VR mode (e.g., re-add the VR button)
}

window.projectInSphere = projectInSphere;
