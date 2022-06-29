import * as THREE from "three";
import { OrbitControls } from "./lib/jsm/controls/OrbitControls.js";
import Stats from "./lib/jsm/libs/stats.module.js";

const OFFSET_RIGHT = 300;
let SCREEN_WIDTH = window.innerWidth - OFFSET_RIGHT;
let SCREEN_HEIGHT = window.innerHeight;
const NEAR = 0.01,
  FAR = 1000;
const camera = new THREE.PerspectiveCamera(
  75,
  SCREEN_WIDTH / SCREEN_HEIGHT,
  NEAR,
  FAR
);
camera.position.set(1.6, 6.4, 5.7);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const container = document.createElement("div");
container.id = "MyCanvas";
let controls = null;
let stats = null;
let showShadow = true;

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
  const length = 5;

  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);
}

// 方格坐标系
function addGridHelper() {
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);
}

// 初始化场景
function initScene(renderWithFrame, initFinished) {
  if (document.getElementById("MyCanvas")) {
    console.log("init finished.");
    return;
  }
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);

  // 摄像机控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  stats = new Stats();
  // container.appendChild(stats.dom);

  addGridHelper();
  addArrowHelper(scene, "x");
  addArrowHelper(scene, "y");
  addArrowHelper(scene, "z");

  renderer.shadowMap.enabled = showShadow;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  if (initFinished && initFinished instanceof Function) {
    initFinished();
  }

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("keydown", onKeyDown);

  // 实时渲染
  function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (renderWithFrame && renderWithFrame instanceof Function) {
      renderWithFrame(intersects);
    }

    stats.update();
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth - OFFSET_RIGHT;
  SCREEN_HEIGHT = window.innerHeight;

  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function onPointerMove(event) {
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 84 /*t*/:
      showShadow = !showShadow;
      break;
  }
}

// 移除对象
function removeEntity(object) {
  var selectedObject = scene.getObjectByName(object.name);
  scene.remove(selectedObject);
}

export { scene, camera, renderer, initScene };
