
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);
camera.position.set(0, 0, 420);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document
  .getElementById("stars-background")
  .appendChild(renderer.domElement);


const textureLoader = new THREE.TextureLoader();

const starsGeometry = new THREE.BufferGeometry();
const starCount = 9000;
const starPositions = [];

for (let i = 0; i < starCount; i++) {
  starPositions.push(
    THREE.MathUtils.randFloatSpread(5000),
    THREE.MathUtils.randFloatSpread(5000),
    THREE.MathUtils.randFloatSpread(5000)
  );
}

starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starPositions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
keyLight.position.set(300, 120, 200);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xff8844, 0.6);
rimLight.position.set(-300, 0, -200);
scene.add(rimLight);


const marsTexture = textureLoader.load("textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace;

const planetGeometry = new THREE.SphereGeometry(120, 96, 96);
const planetMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
  roughness: 0.9,
  metalness: 0.05
});

const heroPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
heroPlanet.position.x = -190;
scene.add(heroPlanet);

const atmosphereGeometry = new THREE.SphereGeometry(126, 96, 96);
const atmosphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffaa88,
  transparent: true,
  opacity: 0.18
});

const atmosphere = new THREE.Mesh(
  atmosphereGeometry,
  atmosphereMaterial
);
heroPlanet.add(atmosphere);


const mercuryTexture = textureLoader.load("textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace;

const neptuneTexture = textureLoader.load("textures/2k_neptune.jpg");
neptuneTexture.colorSpace = THREE.SRGBColorSpace;

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(28, 48, 48),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    roughness: 1,
    metalness: 0
  })
);
mercury.position.set(160, 70, -350);
scene.add(mercury);

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(45, 48, 48),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
    roughness: 0.6,
    metalness: 0.1
  })
);
neptune.position.set(260, -140, -650);
scene.add(neptune);
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 18;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 18;
});
function animate() {
  requestAnimationFrame(animate);

  stars.rotation.y += 0.00015;

  heroPlanet.rotation.y += 0.0004;
  mercury.rotation.y += 0.0006;
  neptune.rotation.y += 0.00025;

  camera.position.x += (mouseX - camera.position.x) * 0.02;
  camera.position.y += (-mouseY - camera.position.y) * 0.02;

  renderer.render(scene, camera);
}

animate();
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
