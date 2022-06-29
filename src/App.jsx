import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "./lib/jsm/loaders/GLTFLoader.js";
import { camera, initScene, scene } from "./render.js";

function App() {
  // 立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 1;

  const loader = new GLTFLoader();

  const [position, setPosition] = useState({ x: "0", y: "0", z: "0" });
  const [objList, setObjList] = useState([]);

  useEffect(() => {
    initScene(cubeAnimation, initFinished);
  }, []);

  /**
   * 实时渲染函数的插入函数
   * @param {Object} intersects 鼠标拾取到的元素
   */
  function cubeAnimation(intersects) {
    // console.log("鼠标拾取", intersects && intersects[0]);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 实时更新摄像机位置
    setPosition({
      x: camera.position.x.toFixed(3),
      y: camera.position.y.toFixed(3),
      z: camera.position.z.toFixed(3),
    });
  }

  // 添加自定义操作
  function initFinished() {
    loader.load(
      "./scene.glb",
      function (gltf) {
        scene.add(gltf.scene);
        let newMaterial = new THREE.MeshBasicMaterial({ color: 0x8b8b8b });
        gltf.scene.children.forEach((o) => {
          if (o.isMesh) o.material = newMaterial;
        });
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.error(error);
      }
    );
    scene.add(cube);
    setObjList(scene.children);
  }

  function getCameraStatus() {
    console.log(camera);
  }

  function handleCameraChange(event, axes) {
    let temp = Object.assign(position, { [axes]: event.target.value });
    camera.position.set(
      parseFloat(temp.x),
      parseFloat(temp.y),
      parseFloat(temp.z)
    );
    setPosition({
      ...temp,
    });
  }

  return (
    <div id="content">
      <div className="right-sidebar">
        <div className="com">
          <p className="com-title">scene children</p>
          {objList.map((ele) => (
            <p key={ele.uuid}>{ele.type}</p>
          ))}
        </div>
        <div className="com">
          <button type="button" onClick={() => getCameraStatus()}>
            camera status
          </button>
          <p className="com-title">camera position</p>
          <p>
            x:{" "}
            <input
              value={position.x}
              onChange={(e) => handleCameraChange(e, "x")}
            ></input>
          </p>
          <p>
            y:{" "}
            <input
              value={position.y}
              onChange={(e) => handleCameraChange(e, "y")}
            ></input>
          </p>
          <p>
            z:{" "}
            <input
              value={position.z}
              onChange={(e) => handleCameraChange(e, "z")}
            ></input>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
