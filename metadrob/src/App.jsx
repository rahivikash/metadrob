import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import './App.css';

const Octahedron = ({ position, size, color, visible, speed }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.z += delta * speed;
    }
  });

  return visible ? (
    <mesh position={position} ref={ref}>
      <octahedronGeometry args={[size]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
    </mesh>
  ) : null;
};

const Torus = ({ position, size, color, visible, speed }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.z += delta * speed;
    }
  });

  return visible ? (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
    </mesh>
  ) : null;
};

const Cube = ({ position, size, color, visible, speed }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.z += delta * speed;
    }
  });

  return visible ? (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
    </mesh>
  ) : null;
};

const App = () => {
  const [octahedronVisible, setOctahedronVisible] = useState(true);
  const [octahedronSpeed, setOctahedronSpeed] = useState(0.01);
  const [torusVisible, setTorusVisible] = useState(true);
  const [torusSpeed, setTorusSpeed] = useState(0.01);
  const [cubeVisible, setCubeVisible] = useState(true);
  const [cubeSpeed, setCubeSpeed] = useState(0.01);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSpeedChange = (setter) => (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if (value < 0) {
        setErrorMessage('Speed value cannot be negative.');
      } else {
        setErrorMessage('');
        setter(value);
      }
    }
  };

  return (
    <>
      <div className="controls">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="control-panel">
          <button onClick={() => setOctahedronVisible(!octahedronVisible)}>Toggle box</button>
          <label>
            Rotation Speed:
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={octahedronSpeed}
              onChange={handleSpeedChange(setOctahedronSpeed)}
            />
            <input
              type="text"
              value={octahedronSpeed}
              onChange={handleSpeedChange(setOctahedronSpeed)}
              onBlur={(e) => {
                if (e.target.value === '' || parseFloat(e.target.value) < 0) {
                  setErrorMessage('Please enter a valid speed value within the range.');
                } else {
                  setErrorMessage('');
                }
              }}
            />
          </label>
        </div>
        <div className="control-panel">
          <button onClick={() => setTorusVisible(!torusVisible)}>Toggle torus</button>
          <label>
            Rotation Speed:
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={torusSpeed}
              onChange={handleSpeedChange(setTorusSpeed)}
            />
            <input
              type="text"
              value={torusSpeed}
              onChange={handleSpeedChange(setTorusSpeed)}
              onBlur={(e) => {
                if (e.target.value === '' || parseFloat(e.target.value) < 0) {
                  setErrorMessage('Please enter a valid speed value within the range.');
                } else {
                  setErrorMessage('');
                }
              }}
            />
          </label>
        </div>
        <div className="control-panel">
          <button onClick={() => setCubeVisible(!cubeVisible)}>dodecahedron</button>
          <label>
            Rotation Speed:
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={cubeSpeed}
              onChange={handleSpeedChange(setCubeSpeed)}
            />
            <input
              type="text"
              value={cubeSpeed}
              onChange={handleSpeedChange(setCubeSpeed)}
              onBlur={(e) => {
                if (e.target.value === '' || parseFloat(e.target.value) < 0) {
                  setErrorMessage('Please enter a valid speed value within the range.');
                } else {
                  setErrorMessage('');
                }
              }}
            />
          </label>
        </div>
      </div>
      <Canvas>
        <directionalLight position={[0, 0, 1]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <Octahedron position={[-4, 1, 0]} color={"#fff"} size={2} visible={octahedronVisible} speed={octahedronSpeed} />
        <Torus position={[1, 1, 0]} color={"#fff"} size={[1, 0.4, 16]} visible={torusVisible} speed={torusSpeed} />
        <Cube position={[5, 1, 0]} color={"#fff"} size={[1, 1, 1]} visible={cubeVisible} speed={cubeSpeed} />
      </Canvas>
    </>
  );
};

export default App;
