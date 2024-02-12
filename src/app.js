let THREE = require('three');
let scene, camera, renderer, texture; // Declare these variables globally

function projectInSphere(canvas) {
  texture = new THREE.Texture(canvas.elt);
  texture.needsUpdate = true;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Hide the renderer's default canvas
  renderer.domElement.style.display = 'none';

  document.body.appendChild(renderer.domElement);

  let geometry = new THREE.SphereGeometry(5, 32, 32);
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  let sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 10;

  renderer.xr.enabled = true;
  renderer.setAnimationLoop(function () {
    texture.needsUpdate = true; // Make sure this line is within the animation loop
    renderer.render(scene, camera);
  });
}

// Check if WebXR is supported
if ('xr' in navigator) {
  navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
    if (supported) {
      const enterVRButton = document.getElementById('enterVR');
      enterVRButton.style.display = 'block';
      enterVRButton.addEventListener('click', () => {
        // Request a session and start VR
        navigator.xr
          .requestSession('immersive-vr', {
            optionalFeatures: ['local-floor', 'bounded-floor'],
          })
          .then(onSessionStarted);
      });
    } else {
      console.log('Immersive VR not supported');
    }
  });
} else {
  console.log('WebXR not supported');
}

let xrSession = null;
let xrReferenceSpace = null;

function onSessionStarted(session) {
  xrSession = session;
  renderer.xr.enabled = true;
  renderer.xr.setSession(session);

  session.addEventListener('end', onSessionEnded);

  session.requestReferenceSpace('local-floor').then((referenceSpace) => {
    xrReferenceSpace = referenceSpace;
  });

  document.getElementById('enterVR').remove(); // Remove the button once in VR
}

function onSessionEnded(event) {
  xrSession = null;
  renderer.xr.enabled = false;
  console.log('VR session ended');
  // Optionally, handle exiting VR mode (e.g., re-add the VR button)
}

window.projectInSphere = projectInSphere;
