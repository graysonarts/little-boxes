import chroma from "chroma-js";
import * as THREE from "three";

const randomCube = (x: number, y: number, colors: string[]): THREE.Mesh => {
  const geo = new THREE.BoxGeometry(
    Math.random() / 2.0 + 0.15,
    Math.random() / 2.0 + 0.15,
    Math.random() / 2.0 + 0.5
  );
  const mat = new THREE.MeshLambertMaterial({
    color: colors[Math.floor(Math.random() * colors.length)],
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, 0);

  return mesh;
};

const colors = chroma
  .scale(["teal", "orange", "#C8A2C8"])
  .mode("lab")
  .colors(9);
console.log(colors);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const meshes: THREE.Mesh[] = [];

for (let x = -5; x < 9; x += 1) {
  for (let y = -3; y < 10; y += 1) {
    const cube = randomCube(x, y, colors);
    scene.add(cube);
    meshes.push(cube);
  }
}
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(-50, 5, 25);
scene.add(light);

camera.position.z = 2;
camera.position.y = -3;
camera.position.x = 2;
camera.rotateX(0.523599 * 1.5);

const animate = function () {
  requestAnimationFrame(animate);

  meshes.forEach((m) => {
    m.rotation.x += Math.random() * 0.01;
    m.rotation.z += Math.random() * 0.05;
  });

  renderer.render(scene, camera);
};

animate();
