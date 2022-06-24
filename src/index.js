import * as THREE from "three";
import { OrbitControls } from "./lib/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();

// 渲染器
function initRenderDom(render) {
  const domContainer = document.getElementById("myCanvas");
  function initDomContainer() {
    let box = domContainer.getBoundingClientRect();
    renderer.setSize(box.width, box.height - 20);
    domContainer.appendChild(renderer.domElement);
  }
  initDomContainer();
}

// 箭头坐标轴
function addArrowHelper(scene, flag = "x") {
  let dir = new THREE.Vector3(0, 0, 1);
  let hex = 0xffff00;
  switch (flag) {
    case "x":
      dir = new THREE.Vector3(1, 0, 0);
      hex = 0x00ffff;
      break;
    case "y":
      dir = new THREE.Vector3(0, 1, 0);
      hex = 0xff00ff;
      break;
    case "z":
      dir = new THREE.Vector3(0, 0, 1);
      hex = 0xffff00;
      break;
    default:
      break;
  }
  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();

  const origin = new THREE.Vector3(0, 0, 0);
  const length = 2;

  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);
}

// 简易坐标轴
function addAxesHelper(scene) {
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

function addGridHelper(scene) {
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);
}

function initScene() {
  initRenderDom(renderer);

  // 摄像机控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  // 立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // addAxesHelper(scene);
  addGridHelper(scene);
  addArrowHelper(scene, "x");
  addArrowHelper(scene, "y");
  addArrowHelper(scene, "z");

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
//initScene();

export { scene, camera, renderer, initScene };
