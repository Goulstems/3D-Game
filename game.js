//[[MODULES]]
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";
import { loadObj } from "./codeModules/objViewer.js";

// Web element / container for the game !
const gameContainer = document.getElementById("game");

// #1 Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// #2 Camera
const camera = new THREE.PerspectiveCamera(
    75,
    800 / 500,
    0.1,
    1000
);
    camera.position.set(0, 4.5, 6.5);
    camera.lookAt(0, 0, 0);

// #3 Renderer
const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 500); // A width of 800px, and a height of 500px
    gameContainer.appendChild(renderer.domElement);

// #4 Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

// #5 Frying pan
loadObj(scene, "./assets/Frying_Pan.obj");

// #6 Patty (smaller, sitting in the pan so both stay visible)
const pattyHolder = new THREE.Group();
pattyHolder.scale.setScalar(0.28);
pattyHolder.position.set(-.25, 0.25, -1.25);
scene.add(pattyHolder);
loadObj(pattyHolder, "./assets/rawPatty.obj");

//============================================================================================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();