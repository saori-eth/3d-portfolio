import { useEffect, useState } from "react";
import { Object3D, PCFShadowMap } from "three";
import { SpotLight } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const World = () => {
	const [target] = useState(() => new Object3D());

	const { gl } = useThree();
	useEffect(() => {
		gl.shadowMap.enabled = true;
		gl.shadowMap.type = PCFShadowMap;
	}, [gl]);

	return (
		<>
			<ambientLight intensity={0.5} />
			{/* box */}
			<mesh castShadow receiveShadow>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color="hotpink" />
			</mesh>
			{/* floor */}
			<mesh
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -0.5, 0]}
				receiveShadow
				castShadow
			>
				<planeGeometry args={[5, 5]} />
				<meshStandardMaterial color="lightblue" />
			</mesh>
			{/* spotlight */}
			<mesh position={[1, 2, 0]} castShadow receiveShadow>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="orange" />
			</mesh>
			<SpotLight
				color="blue"
				position={[1, 2, 0]}
				intensity={2}
				target={target}
				castShadow
			/>
			<primitive object={target} />
		</>
	);
};
