import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export class VRMSystem {
  driver: any;
  avatars: any[] = [];
  constructor(driver: any) {
    this.driver = driver;
  }

  load(url: string) {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      url,
      (gltf) => {
        VRMUtils.removeUnnecessaryJoints(gltf.scene);
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        const vrm = gltf.userData.vrm;
        vrm.lookAt.target = this.driver.lookAtTarget;
        vrm.scene.traverse((obj: any) => {
          obj.frustumCulled = false;
        });
        this.driver.scene.add(vrm.scene);
        vrm.scene.rotation.y = Math.PI;
        this.avatars.push(vrm);
      },
      (progress) =>
        console.log(
          "Loading VRM...",
          100.0 * (progress.loaded / progress.total),
          "%"
        ),
      (error) => console.error("Failed to load VRM:", error)
    );
  }
}
