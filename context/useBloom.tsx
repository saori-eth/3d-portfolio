import { createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";

type DeltaY = number;

const BloomContext = createContext<{
	lights: THREE.Object3D[] | null;
	setLights: (lighting: THREE.Object3D[]) => void;
	objects: THREE.Object3D[] | null;
	setObjects: (objects: THREE.Object3D[]) => void;
} | null>(null);

export const BloomProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const lightsRef = useRef<THREE.Object3D[] | null>(null);
	const setLights = (lighting: THREE.Object3D[]) => {
		lightsRef.current = lighting;
	};
	const objectsRef = useRef<THREE.Object3D[] | null>(null);
	const setObjects = (objects: THREE.Object3D[]) => {
		objectsRef.current = objects;
	};

	return (
		<BloomContext.Provider
			value={{
				lights: lightsRef.current,
				setLights,
				objects: objectsRef.current,
				setObjects,
			}}
		>
			{children}
		</BloomContext.Provider>
	);
};

export const useBloom = () => {
	const context = useContext(BloomContext);
	if (!context) {
		throw new Error("useBloom must be used within a BloomProvider");
	}
	return context;
};
