import * as THREE from "three";

let scene, camera, renderer, sun, earth, orbit;

function init() {
  // create scene
  scene = new THREE.Scene();

  // create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 30;
  
  // create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // create sun
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    map: new THREE.TextureLoader().load("./2k_sun.jpg",),
    });
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load( "./2k_earth_daymap.jpg",),
    });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  //scene.add(earth);

  orbit = new THREE.Group();
  orbit.add(earth);
  scene.add(orbit);

  earth.position.x = 0;
  earth.position.z = 10;
  animate();
  
}

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.01;

  earth.rotation.y += 0.01;

  orbit.rotation.y += 0.001;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();