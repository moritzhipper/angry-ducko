/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 src/assets/models/angry_ducko.glb 
*/

import { useGLTF } from "@react-three/drei";
import React from "react";

export function Model(props) {
  const { nodes, materials } = useGLTF("/angry_ducko.glb");

  const material = {
    ...materials["SVGMat.004"],
    roughness: 10,
    metalness: 0,
    color: "white",
  };

  console.log(materials["SVGMat.004"]);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.path26.geometry}
        material={material}
        position={[-3.161, -3.139, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={28.546}
      />
    </group>
  );
}

useGLTF.preload("/angry_ducko.glb");
