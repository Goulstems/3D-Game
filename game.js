//[[MODULES]]
import * as THREE from "three";
import { loadObj } from "./codeModules/objViewer.js";
import {cameraRotate} from "./codeModules/cameraRotate.js";
import { sceneResizer } from "./codeModules/sceneResizer.js";

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
    gameContainer.appendChild(renderer.domElement);

sceneResizer(gameContainer, camera, renderer, scene);

// #4 Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

// #5 Frying pan
loadObj(scene, "./assets/Frying_Pan.obj");

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();