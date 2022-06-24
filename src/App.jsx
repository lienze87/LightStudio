import { useEffect } from "react";
import { camera, initScene } from "./index.js";

function App() {
  useEffect(() => {
    initScene();
  }, []);

  function getCameraStatus() {
    console.log(camera.position);
  }
  return (
    <>
      <div className="header">
        <p>React+Vite+ThreeJS</p>
        <button type="button" onClick={() => getCameraStatus()}>
          camera position
        </button>
      </div>
      <div id="content">
        <div className="left-sidebar">left-bar</div>
        <div id="myCanvas" className="main-canvas"></div>
        <div className="right-sidebar">right-bar</div>
      </div>
    </>
  );
}

export default App;
