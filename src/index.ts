import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize);

const loader = new GLTFLoader()

// scene.add(new THREE.GridHelper(100, 100));

addLights();
addTokyo();
addEva();
const octahedron = addOctahedron();
const controls = addControls();

animate();

function addLights() {
    scene.add(new THREE.AmbientLight(0x555544));

    const light1 = new THREE.PointLight(0xffffee);
    light1.position.set(10, 20, 20);
    scene.add(light1);
    // scene.add(new THREE.PointLightHelper(light1));

    const light2 = new THREE.PointLight(0x00ccff);
    light2.position.set(3, 5, 10);
    scene.add(light2);
    // scene.add(new THREE.PointLightHelper(light2));
}

function addOctahedron() {
    const octahedron = new THREE.Group();
    const geometry = new THREE.OctahedronGeometry(3);

    octahedron.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x00ccff })));
    octahedron.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })));

    octahedron.translateX(3);
    octahedron.translateY(5);
    octahedron.translateZ(10);
    octahedron.scale.set(1, 0.85, 1);
    scene.add(octahedron);
    return octahedron;
}

function addTokyo() {
    loader.setPath('models/gltf/tokyo_station_a/');
    loader.load('scene.gltf', function ({ scene: tokyo }) {
        tokyo.translateY(-57);
        tokyo.rotateY(Math.PI);
        scene.add(tokyo);
    });
}

function addEva() {
    loader.setPath('models/gltf/neon_genesis_evangelion_unit_01/');
    loader.load('scene.gltf', function ({ scene: eva }) {
        eva.translateX(5);
        eva.translateZ(-1);
        eva.rotateX(5 / 180 * Math.PI);
        eva.scale.set(1, 1, 1);
        scene.add(eva);
    });
}

function addControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(4, 0, 3); // set the center
    controls.maxPolarAngle = Math.PI / 2.5; // prevent the camera from going under the ground
    controls.maxAzimuthAngle = Math.PI / 3;
    controls.minAzimuthAngle = -Math.PI / 3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    return controls;
}

function animate() {
    requestAnimationFrame(animate);

    octahedron.rotation.y += 0.005;

    controls.update();
    if (controls.getAzimuthalAngle() <= controls.minAzimuthAngle ||
        controls.getAzimuthalAngle() >= controls.maxAzimuthAngle) {
        controls.autoRotateSpeed *= -1;
    }

    renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
