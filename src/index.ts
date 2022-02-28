import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ccff, wireframe: true });
const octahedron = new THREE.Mesh(geometry, material);
scene.add(octahedron);

function animate() {
    requestAnimationFrame(animate);

    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.01;
    octahedron.rotation.z += 0.01;

    renderer.render(scene, camera);
};

animate();
