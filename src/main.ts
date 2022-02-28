import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';

const HELPER = false;
let toLoad = 0;
let loaded = 0;

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

if (HELPER) scene.add(new THREE.GridHelper(100, 100));

addLights();
addTokyo();
addEva();
const octahedron = addOctahedron();
const controls = addControls();

animate();

function addLights() {
    scene.add(new THREE.AmbientLight(0x555544));

    const sky = new THREE.PointLight(0xffffee, 2);
    sky.position.set(10, 20, 20);
    scene.add(sky);
    if (HELPER) scene.add(new THREE.PointLightHelper(sky));

    const light2 = new THREE.PointLight(0x00ccff);
    light2.position.set(3, 5, 10);
    scene.add(light2);
    if (HELPER) scene.add(new THREE.PointLightHelper(light2));

    var spotlightTarget = new Object3D();
    spotlightTarget.position.set(5, 6, -5);
    scene.add(spotlightTarget);

    const light3 = new THREE.SpotLight(0xffff77, 1);
    light3.position.set(0, 1, 3);
    light3.target = spotlightTarget;
    light3.target.updateMatrixWorld();
    scene.add(light3);
    if (HELPER) scene.add(new THREE.SpotLightHelper(light3));

    const light4 = new THREE.SpotLight(0xffff77, 1);
    light4.position.set(10, 1, 3);
    light4.target = spotlightTarget;
    light4.target.updateMatrixWorld();
    scene.add(light4);
    if (HELPER) scene.add(new THREE.SpotLightHelper(light4));

    const light5 = new THREE.SpotLight(0xffff77, 1);
    light5.position.set(5, 7, 5);
    light5.target = spotlightTarget;
    light5.target.updateMatrixWorld();
    scene.add(light5);
    if (HELPER) scene.add(new THREE.SpotLightHelper(light5));
}

function addOctahedron() {
    const octahedron = new THREE.Group();
    const geometry = new THREE.OctahedronGeometry(3);

    var color = 0x0055ff;
    octahedron.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, opacity: 0.95, transparent: true })));
    octahedron.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, wireframe: true })));

    octahedron.translateX(3);
    octahedron.translateY(5);
    octahedron.translateZ(10);
    octahedron.scale.set(1, 0.85, 1);
    scene.add(octahedron);
    return octahedron;
}

function addTokyo() {
    toLoad++;
    loader.setPath('models/gltf/tokyo_station_a/');
    loader.load('scene.gltf', function ({ scene: tokyo }) {
        tokyo.translateY(-57);
        tokyo.rotateY(Math.PI);
        scene.add(tokyo);
        loaded++;
    });
}

function addEva() {
    toLoad++;
    loader.setPath('models/gltf/eva-01/');
    loader.load('scene.gltf', function ({ scene: eva }) {
        eva.scale.set(0.01, 0.01, 0.01);
        eva.translateX(5);
        eva.translateY(-0.3);
        eva.translateZ(0);
        eva.rotateX(5 / 180 * Math.PI);
        scene.add(eva);
        loaded++;
    });
}

function addControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(4, 0, 5); // set the center
    controls.maxPolarAngle = Math.PI / 2.5; // prevent the camera from going under the ground
    controls.maxAzimuthAngle = Math.PI / 3;
    controls.minAzimuthAngle = -Math.PI / 3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    return controls;
}

function animate() {
    requestAnimationFrame(animate);

    if (loaded < toLoad) return;

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
