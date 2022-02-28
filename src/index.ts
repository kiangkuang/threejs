import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ccff });
const octahedron = new THREE.Mesh(geometry, material);
scene.add(octahedron);

const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper);

function animate() {
    requestAnimationFrame(animate);

    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.01;
    octahedron.rotation.z += 0.01;

    renderer.render(scene, camera);
};

animate();
