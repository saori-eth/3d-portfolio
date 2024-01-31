import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const loadVRM = (scene: any, url: string) => {
  const loader = new GLTFLoader();
  loader.register((parser) => new VRMLoaderPlugin(parser));

  loader.load(
    url,
    (gltf) => {
      const vrm = gltf.userData.vrm;
      scene.add(vrm.scene);
      vrm.scene.rotation.y = Math.PI;
      console.log("VRM loaded", vrm);
    },
    (progress) =>
      console.log(
        "Loading VRM...",
        100.0 * (progress.loaded / progress.total),
        "%"
      ),
    (error) => console.error("Failed to load VRM:", error)
  );
};
