"use client";

import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import * as THREE from 'three';

function Cubes() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const [hovered, setHover] = useState<number | null>(null);

    const count = 500; // Number of cubes
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const colors = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const color = new THREE.Color();
        for (let i = 0; i < count; i++) {
            color.setHex(Math.random() * 0xffffff);
            temp[i * 3] = color.r;
            temp[i * 3 + 1] = color.g;
            temp[i * 3 + 2] = color.b;
        }
        return temp;
    }, [count]);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * 800 - 400;
            const y = Math.random() * 800 - 400;
            const z = Math.random() * 800 - 400;
            const rotationX = Math.random() * 2 * Math.PI;
            const rotationY = Math.random() * 2 * Math.PI;
            temp.push({ x, y, z, rotationX, rotationY });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            const { x, y, z, rotationX, rotationY } = particle;

            dummy.position.set(x, y, z);
            dummy.rotation.set(rotationX + time * 0.1, rotationY + time * 0.1, 0);
            dummy.scale.setScalar(20 + Math.sin(time + i) * 10); // Pulsating size

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial />
            <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
        </instancedMesh>
    );
}

function SceneContent() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <Cubes />
        </>
    );
}

function AsciiEffectComponent() {
    const { gl, scene, camera, size } = useThree();
    const effectRef = useRef<AsciiEffect | null>(null);

    useLayoutEffect(() => {
        const effect = new AsciiEffect(gl, ' .:-+*=%@#', { invert: true });
        effect.domElement.style.position = 'absolute';
        effect.domElement.style.top = '0px';
        effect.domElement.style.left = '0px';
        effect.domElement.style.color = 'white';
        effect.domElement.style.backgroundColor = 'black';
        effect.domElement.style.pointerEvents = 'none';

        // Append to the parent of the canvas
        gl.domElement.parentNode?.appendChild(effect.domElement);
        effectRef.current = effect;

        return () => {
            gl.domElement.parentNode?.removeChild(effect.domElement);
        };
    }, [gl]);

    useLayoutEffect(() => {
        if (effectRef.current) {
            // Ensure integer values for size to avoid "Value is not of type long" error
            effectRef.current.setSize(Math.floor(size.width), Math.floor(size.height));
        }
    }, [size]);

    useFrame(() => {
        if (effectRef.current) {
            effectRef.current.render(scene, camera);
        }
    }, 1);

    return null;
}

export default function AsciiHero() {
    return (
        <div className="w-full h-full relative min-h-[350px] md:min-h-[500px]">
            <Canvas orthographic camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 2000 }}>
                <color attach="background" args={['black']} />
                <SceneContent />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <AsciiEffectComponent />
            </Canvas>
        </div>
    );
}
