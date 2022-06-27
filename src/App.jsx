import { useEffect, useState } from "react";
import * as THREE from "three";
import { camera, initScene, scene } from "./render.js";

function App() {
  // 立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [objList, setObjList] = useState([]);

  useEffect(() => {
    initScene(cubeAnimation, initFinished);
  }, []);

  // 插入渲染函数
  function cubeAnimation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    setRotation([cube.rotation.x, cube.rotation.y, cube.rotation.z]);
  }

  // 添加自定义操作
  function initFinished() {
    scene.add(cube);
    setObjList(scene.children);
  }

  function getCameraStatus() {
    console.log(camera);
  }

  return (
    <div id="content">
      <button type="button" onClick={() => getCameraStatus()}>
        camera position
      </button>
      <div className="right-sidebar">
        <div className="com">
          <p className="com-title">scene children</p>
          {objList.map((ele) => (
            <p key={ele.uuid}>{ele.type}</p>
          ))}
        </div>
        <div className="com">
          <p className="com-title">cube rotation</p>
          <p>x: {rotation[0].toFixed(3)}</p>
          <p>y: {rotation[1].toFixed(3)}</p>
          <p>z: {rotation[2].toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
