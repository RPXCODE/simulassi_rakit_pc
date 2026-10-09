import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Highly Detailed Composed Components ---

const Casing = () => {
  return (
    <group>
      {/* Base */}
      <Box args={[10, 0.5, 20]} position={[0, -10, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </Box>
      {/* Top */}
      <Box args={[10, 0.5, 20]} position={[0, 10, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </Box>
      {/* Back Panel */}
      <Box args={[0.5, 20.5, 20]} position={[-5, 0, 0]}>
        <meshStandardMaterial color="#151515" roughness={0.8} />
      </Box>
      {/* Front Panel (Mesh) */}
      <Box args={[10, 20.5, 0.5]} position={[0, 0, 10]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} wireframe />
      </Box>
      {/* Front Glass layer behind mesh */}
      <Box args={[9.8, 20.3, 0.2]} position={[0, 0, 9.8]}>
        <meshStandardMaterial color="#fff" opacity={0.3} transparent />
      </Box>
      {/* Tempered Glass Side Panel */}
      <Box args={[0.1, 20.5, 20]} position={[5, 0, 0]}>
        <meshStandardMaterial color="#ffffff" opacity={0.15} transparent metalness={0.9} roughness={0.05} />
      </Box>
      {/* Case Feet */}
      <Box args={[1, 0.5, 1]} position={[4, -10.5, 9]}><meshStandardMaterial color="#111" /></Box>
      <Box args={[1, 0.5, 1]} position={[-4, -10.5, 9]}><meshStandardMaterial color="#111" /></Box>
      <Box args={[1, 0.5, 1]} position={[4, -10.5, -9]}><meshStandardMaterial color="#111" /></Box>
      <Box args={[1, 0.5, 1]} position={[-4, -10.5, -9]}><meshStandardMaterial color="#111" /></Box>
    </group>
  );
};

const Motherboard = () => {
  return (
    <group position={[-4.5, 1, -2]}>
      {/* Main PCB */}
      <Box args={[0.2, 14, 12]}>
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.8} />
      </Box>
      {/* VRM Heatsinks */}
      <Box args={[1, 3, 1]} position={[0.6, 5, -5]}><meshStandardMaterial color="#444" metalness={0.8} /></Box>
      <Box args={[1, 1, 4]} position={[0.6, 6, -2]}><meshStandardMaterial color="#444" metalness={0.8} /></Box>
      {/* CPU Socket Area */}
      <Box args={[0.4, 3, 3]} position={[0.3, 3, -4]}>
        <meshStandardMaterial color="#666" metalness={0.9} />
      </Box>
      {/* RAM Slots */}
      <Box args={[0.3, 4, 0.2]} position={[0.3, 3, -1]}><meshStandardMaterial color="#222" /></Box>
      <Box args={[0.3, 4, 0.2]} position={[0.3, 3, -0.5]}><meshStandardMaterial color="#444" /></Box>
      <Box args={[0.3, 4, 0.2]} position={[0.3, 3, 0]}><meshStandardMaterial color="#222" /></Box>
      <Box args={[0.3, 4, 0.2]} position={[0.3, 3, 0.5]}><meshStandardMaterial color="#444" /></Box>
      {/* PCIe Slots */}
      <Box args={[0.5, 0.5, 9]} position={[0.3, -2, 1]}><meshStandardMaterial color="#333" metalness={0.8} /></Box>
      <Box args={[0.5, 0.5, 6]} position={[0.3, -5, -0.5]}><meshStandardMaterial color="#222" /></Box>
      {/* Chipset Heatsink */}
      <Box args={[0.8, 3, 3]} position={[0.5, -4, 4]}>
        <meshStandardMaterial color="#222" metalness={0.8} />
      </Box>
      {/* Rear IO Shield */}
      <Box args={[1, 7, 1]} position={[0.6, 3, -5.5]}>
        <meshStandardMaterial color="#999" metalness={0.9} />
      </Box>
    </group>
  );
};

const CPU = () => {
  return (
    <group position={[-4.1, 4, -6]}>
      {/* PCB substrate */}
      <Box args={[0.2, 2.5, 2.5]}>
        <meshStandardMaterial color="#2c5a2c" />
      </Box>
      {/* IHS (Integrated Heat Spreader) */}
      <Box args={[0.2, 2, 2]} position={[0.2, 0, 0]}>
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </Box>
    </group>
  );
};

const Cooler = () => {
  const fanRef1 = useRef();
  
  useFrame((state, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.x += delta * 15;
  });

  return (
    <group position={[-2.5, 4, -6]}>
      {/* Heatsink Tower */}
      <Box args={[2.5, 4, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} wireframe />
      </Box>
      {/* Heatpipes */}
      <Cylinder args={[0.1, 0.1, 4.5, 8]} position={[0, 0, 1]}><meshStandardMaterial color="#b87333" metalness={1} /></Cylinder>
      <Cylinder args={[0.1, 0.1, 4.5, 8]} position={[0, 0, 0]}><meshStandardMaterial color="#b87333" metalness={1} /></Cylinder>
      <Cylinder args={[0.1, 0.1, 4.5, 8]} position={[0, 0, -1]}><meshStandardMaterial color="#b87333" metalness={1} /></Cylinder>
      
      {/* RGB Fan Front */}
      <group position={[1.3, 0, 0]}>
        <Cylinder args={[1.4, 1.4, 0.4, 32]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#222" />
        </Cylinder>
        <Cylinder ref={fanRef1} args={[1.3, 1.3, 0.5, 16]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#fff" emissive="#00eeff" emissiveIntensity={2} />
        </Cylinder>
      </group>
    </group>
  );
};

const RAM = () => {
  return (
    <group position={[-4.1, 4, -2.5]}>
      {/* Stick 1 */}
      <group position={[0, 0, 0]}>
        <Box args={[0.8, 3.8, 0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} />
        </Box>
        {/* RGB Diffuser */}
        <Box args={[0.8, 3.8, 0.05]} position={[0.05, 0, 0]}>
          <meshStandardMaterial color="#fff" emissive="#ff00ff" emissiveIntensity={2} />
        </Box>
      </group>
      
      {/* Stick 2 */}
      <group position={[0, 0, 1]}>
        <Box args={[0.8, 3.8, 0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} />
        </Box>
        <Box args={[0.8, 3.8, 0.05]} position={[0.05, 0, 0]}>
          <meshStandardMaterial color="#fff" emissive="#ff00ff" emissiveIntensity={2} />
        </Box>
      </group>
    </group>
  );
};

const GPU = () => {
  const fanRef1 = useRef();
  const fanRef2 = useRef();
  const fanRef3 = useRef();

  useFrame((state, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.y += delta * 12;
    if (fanRef2.current) fanRef2.current.rotation.y += delta * 12;
    if (fanRef3.current) fanRef3.current.rotation.y += delta * 12;
  });

  return (
    <group position={[-2.5, -1, -1]}>
      {/* Backplate */}
      <Box args={[4.2, 0.2, 12]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#222" metalness={0.6} />
      </Box>
      {/* Heatsink Body */}
      <Box args={[4, 1, 11.8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#666" metalness={0.8} roughness={0.4} wireframe />
      </Box>
      {/* Shroud */}
      <Box args={[4.2, 0.4, 12]} position={[0, -0.7, 0]}>
        <meshStandardMaterial color="#111" metalness={0.5} />
      </Box>
      {/* PCIe Connector */}
      <Box args={[1, 0.5, 4]} position={[-2.1, 0.8, -2]}>
        <meshStandardMaterial color="#d4af37" />
      </Box>
      
      {/* RGB Logo Strip */}
      <Box args={[4.3, 0.2, 5]} position={[0, 0.4, -2]}>
         <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.5} />
      </Box>

      {/* GPU Fans */}
      <group position={[1.5, -0.9, 3.5]}>
        <Cylinder ref={fanRef1} args={[1.5, 1.5, 0.2, 16]} rotation={[0, 0, 0]}>
           <meshStandardMaterial color="#333" />
        </Cylinder>
      </group>
      <group position={[1.5, -0.9, 0]}>
        <Cylinder ref={fanRef2} args={[1.5, 1.5, 0.2, 16]} rotation={[0, 0, 0]}>
           <meshStandardMaterial color="#333" />
        </Cylinder>
      </group>
      <group position={[1.5, -0.9, -3.5]}>
        <Cylinder ref={fanRef3} args={[1.5, 1.5, 0.2, 16]} rotation={[0, 0, 0]}>
           <meshStandardMaterial color="#333" />
        </Cylinder>
      </group>
    </group>
  );
};

const PSU = () => {
  return (
    <group position={[-2, -8.5, -6]}>
      {/* Main Block */}
      <Box args={[4.5, 3.5, 6]}>
        <meshStandardMaterial color="#111" metalness={0.5} />
      </Box>
      {/* Fan Grill */}
      <Cylinder args={[1.5, 1.5, 0.1, 32]} rotation={[0, 0, Math.PI/2]} position={[2.3, 0, 0]}>
        <meshStandardMaterial color="#333" wireframe />
      </Cylinder>
      {/* Cables sticking out */}
      <Cylinder args={[0.2, 0.2, 3]} position={[0, 0, 4]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#000" />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 3]} position={[1, 0, 4]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#000" />
      </Cylinder>
    </group>
  );
};

const Storage = () => {
  return (
    <group position={[-4.2, -6, 5]}>
      {/* SSD Body */}
      <Box args={[0.2, 3, 4]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} />
      </Box>
      {/* SSD Sticker/Label */}
      <Box args={[0.25, 2.5, 3.5]} position={[0.01, 0, 0]}>
        <meshStandardMaterial color="#ccc" />
      </Box>
    </group>
  );
};


const PCViewer3D = ({ build }) => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1c1f26', borderRadius: '8px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [25, 8, 25], fov: 45 }}>
        
        {/* Superior Lighting for Realism */}
        <ambientLight intensity={1.5} />
        <spotLight position={[15, 20, 15]} angle={0.5} penumbra={0.8} intensity={400} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={150} color="#ffffff" distance={40} />
        <pointLight position={[5, -5, -5]} intensity={100} color="#60a5fa" distance={30} />
        
        {/* Environment map for realistic reflections */}
        <Environment preset="city" />
        
        <group>
          {build.case ? <Casing /> : (
            <Text position={[0, 0, 0]} fontSize={1.2} color="#888888">
              Pilih Casing untuk mulai
            </Text>
          )}

          {build.motherboard && <Motherboard />}
          {build.cpu && <CPU />}
          {build.cooler && <Cooler />}
          {build.ram && <RAM />}
          {build.gpu && <GPU />}
          {build.psu && <PSU />}
          {build.storage && <Storage />}
        </group>

        <OrbitControls 
          enablePan={false}
          minDistance={15}
          maxDistance={40}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={!build.case}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default PCViewer3D;
