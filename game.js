import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";

const gameContainer = document.getElementById("game");

// Scene - IMPORTANT thing #1 enviorment
console.log (THREE);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera - IMPORTANT thing #2 eyes
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Renderer - MOST IMPORTANT thing
const renderer = new THREE.WebGLRenderer;

renderer.setSize(800, 500) // A width of 800px, and a height of 500px
gameContainer.appendChild(renderer.domElement);

// Render! - make Game
renderer.render(scene, camera);