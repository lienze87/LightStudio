import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <p>React+Vite+ThreeJS</p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
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
