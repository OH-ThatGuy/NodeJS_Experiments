import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

// Orbit Control
const controls = new OrbitControls(camera, renderer.domElement);

// Changed the background to the sea instead of space
const seaTexture = new THREE.TextureLoader().load('assets/sea.png');
scene.background = seaTexture;

// Replaced the smiley face with round coral
const textureLoader = new THREE.TextureLoader();
const coralTexture = textureLoader.load('assets/coral.jpg');
const coralNormal = textureLoader.load('assets/normals/coral_normal.png');

const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
const coralMaterial = new THREE.MeshStandardMaterial({
    map: coralTexture,
    normalMap: coralNormal,
    color: 0xffffff,
    roughness: 1,
    metalness: 0
});

const coralMesh = new THREE.Mesh(sphereGeometry, coralMaterial);
coralMesh.position.y = -15;
scene.add(coralMesh);

// Changed the torus texture to seaweed, otherwise mostly unchanged
const torusTexture = textureLoader.load('assets/seaweed.jpg');
const torusNormalTexture = textureLoader.load('assets/normals/seaweed_normal.png');

const torusMaterial = new THREE.MeshStandardMaterial({
    map: torusTexture,
    normalMap: torusNormalTexture,
    roughness: 1,
    metalness: 0
});

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(5, 1, 250, 5, 9, 15),
    torusMaterial
);
torusKnot.position.y = 20;
scene.add(torusKnot);

// Replaced the cube and isohedron (or whatever the shape was) with spheres to mimic bubbles
// There is probably a more efficent way to do this also
const bubble1 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: 0.4
    })
);
bubble1.position.set(-20, -5, -10);
scene.add(bubble1);

const bubble2 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: 0.4
    })
);
bubble2.position.set(20, -12, -15);
scene.add(bubble2);

const bubble3 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: 0.4
    })
);
bubble3.position.set(-18, -18, -8);
scene.add(bubble3);

const bubble4 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: 0.4
    })
);
bubble4.position.set(18, -8, -12);
scene.add(bubble4);

const bubble5 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: 0.4
    })
);
bubble5.position.set(0, -20, -18);
scene.add(bubble5);

const smallSpheres = [bubble1, bubble2, bubble3, bubble4, bubble5];
const bubbleDirections = [0.01, 0.008, 0.012, 0.009, 0.011];

// Animate
function animate() {
    requestAnimationFrame(animate);

    coralMesh.rotation.y += 0.03;
    coralMesh.rotation.x += 0.01;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    smallSpheres.forEach((sphere, index) => {
        sphere.position.y += bubbleDirections[index];
        if (sphere.position.y > 0 || sphere.position.y < -25) {
            bubbleDirections[index] *= -1;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
