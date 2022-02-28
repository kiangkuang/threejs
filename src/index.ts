import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 20;

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

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const loader = new GLTFLoader()

let tokyo;
loader.setPath('models/gltf/tokyo_station_a/');
loader.load('scene.gltf', function (gltf) {
    tokyo = gltf.scene;
    tokyo.translateY(-57);
    tokyo.rotateY(Math.PI);
    scene.add(tokyo);
});

let eva;
loader.setPath('models/gltf/neon_genesis_evangelion_unit_01/');
loader.load('scene.gltf', function (gltf) {
    eva = gltf.scene
    scene.add(eva);
});

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    octahedron.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
};

animate();
