"use client";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { World } from "./World";

const Experience = () => {
	return (
		<>
			<Loader />
			<Canvas shadows>
				<OrbitControls />
				<Suspense fallback={null}>
					<World />
				</Suspense>
			</Canvas>
		</>
	);
};

export default Experience;
