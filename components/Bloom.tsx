import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
	EffectComposer,
	RenderPass,
	UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
import { Vector2 } from "three";

interface BloomProps {
	strength?: number;
	radius?: number;
	threshold?: number;
}
export const Bloom = ({
	strength = 0.25,
	radius = 2,
	threshold = 1,
}: BloomProps) => {
	const { gl, scene, camera, size } = useThree();
	const composer = useRef<EffectComposer>();
	const bloomPass = useRef<UnrealBloomPass>();

	useEffect(() => {
		composer.current = new EffectComposer(gl);
		composer.current.addPass(new RenderPass(scene, camera));
		bloomPass.current = new UnrealBloomPass(
			new Vector2(size.width, size.height),
			strength,
			radius,
			threshold,
		);
		composer.current.addPass(bloomPass.current);
	}, [gl, scene, camera, size, strength, radius, threshold]);

	useEffect(() => {
		if (!bloomPass.current) return;
		bloomPass.current.strength = strength;
		bloomPass.current.radius = radius;
		bloomPass.current.threshold = threshold;
		bloomPass.current.setSize(size.width, size.height);
	}, [strength, radius, threshold, size]);

	useFrame(() => composer.current?.render(), 1);

	return <></>;
};
