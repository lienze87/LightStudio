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
function initRenderDom() {
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

// 方格坐标系
function addGridHelper(scene) {
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);
}

// 初始化场景
function initScene(renderWithFrame, initFinished) {
  if (scene.children.length > 0) {
    console.log("init finished.");
    return;
  }
  initRenderDom();

  // 摄像机控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  addGridHelper(scene);
  addArrowHelper(scene, "x");
  addArrowHelper(scene, "y");
  addArrowHelper(scene, "z");

  if (initFinished instanceof Function) {
    initFinished();
  }

  // 实时渲染
  function animate() {
    requestAnimationFrame(animate);

    if (renderWithFrame instanceof Function) {
      renderWithFrame();
    }
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
//initScene();

export { scene, camera, renderer, initScene };
