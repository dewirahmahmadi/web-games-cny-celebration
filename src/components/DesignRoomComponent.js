import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const furnitureLibrary = [
  { name: 'Chair', model: '/models/chair.glb', scale: 0.5 },
  { name: 'Table', model: '/models/chair.glb', scale: 0.5 },
  // Add more furniture items as needed
];

const DesignRoomComponent = ({ onBack }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfff4e0); // Light cream background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create room
    const roomGeometry = new THREE.BoxGeometry(10, 8, 10);
    const roomMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff6b6b, // Bright red
      side: THREE.BackSide,
      shininess: 50
    });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xd2b48c,
      shininess: 60
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4;
    scene.add(floor);

    // Animation loop
    const animate = () => {
      if (sceneRef.current) {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
      sceneRef.current = null;
    };
  }, []); // Run this effect only once on component mount

  const addFurniture = (item) => {
    const loader = new GLTFLoader();
    loader.load(
      item.model,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(item.scale, item.scale, item.scale);
        model.position.set(0, -4, 0); // Default position
        sceneRef.current.add(model);
        setFurniture([...furniture, { name: item.name, model }]);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
  };

  const moveFurniture = (index, direction) => {
    const item = furniture[index];
    switch(direction) {
      case 'left':
        item.model.position.x -= 0.1;
        break;
      case 'right':
        item.model.position.x += 0.1;
        break;
      case 'forward':
        item.model.position.z -= 0.1;
        break;
      case 'backward':
        item.model.position.z += 0.1;
        break;
    }
    setFurniture([...furniture]);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Furniture Library</h3>
        {furnitureLibrary.map((item, index) => (
          <button 
            key={index}
            className="block mb-2 bg-yellow-300 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400"
            onClick={() => addFurniture(item)}
          >
            Add {item.name}
          </button>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Placed Furniture</h3>
        {furniture.map((item, index) => (
          <div key={index} className="mb-2">
            <span>{item.name}</span>
            <div>
              <button onClick={() => moveFurniture(index, 'left')}>←</button>
              <button onClick={() => moveFurniture(index, 'forward')}>↑</button>
              <button onClick={() => moveFurniture(index, 'backward')}>↓</button>
              <button onClick={() => moveFurniture(index, 'right')}>→</button>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="absolute top-4 left-4 bg-yellow-300 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-400 transition duration-300 z-10"
        onClick={onBack}
      >
        ←
      </button>
    </div>
  );
};

export default DesignRoomComponent;
