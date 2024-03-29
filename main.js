import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap/gsap-core";

//Scene
const scene = new THREE.Scene();

//Create out Sphere   (Radius, WithSegments, HeightSegments, phiStart, phiLength, thetaStart, thetaLength)
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#A020F0",
  roughness: 0.2,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light
const light1 = new THREE.PointLight(0xffffff, 700, 100, 1.8);
// const light1 = new THREE.AmbientLight(0x404040, 10);
light1.position.set(0, 50, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 100, 100, 2);
light2.position.set(0, -50, 10);
scene.add(light2);

// const light3 = new THREE.PointLight(0xffffff, 500, 100, 2);
// light3.position.set(50, -50, 10);
// scene.add(light3);

// const light4 = new THREE.PointLight(0xffffff, 500, 100, 2);
// light4.position.set(50, -50, 10);
// scene.add(light4);

// const light5 = new THREE.PointLight(0xffffff, 500, 100, 2);
// light5.position.set(50, -50, 10);
// scene.add(light5);

// const light6 = new THREE.PointLight(0xffffff, 500, 100, 2);
// light6.position.set(50, -50, 10);
// scene.add(light6);

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
// renderer.setClearColor( 0xffffff, 0);  Sets background to clear
renderer.render(scene, camera);

//Resize
window.addEventListener("resize", () => {
  //Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

//Rerenders the sphere
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//TimeLine
const tl = gsap.timeline({ defaults: { duration: 1 } });
// tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

//Mouse Animation Color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    //Lets animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
