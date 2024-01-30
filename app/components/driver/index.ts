import {
  Engine,
  Scene,
  MeshBuilder,
  Vector3,
  HemisphericLight,
  FreeCamera,
  SceneLoader,
} from "@babylonjs/core";
import { SkyMaterial } from "@babylonjs/materials";
import "@babylonjs/loaders/glTF";
import "babylon-vrm-loader";
import { poses } from "./utils";

const BASE_URL = "https://saori-content.s3.amazonaws.com/";

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  mesh: any;
  vrmManagers: any;
  constructor(props: DriverProps) {
    this.canvas = props.canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.mesh = {
      // avatar: Mesh[]
    };
    this.listeners();
    this.testScene();
    this.loadVrm();
  }

  async loadVrm() {
    SceneLoader.ImportMesh("", BASE_URL, "803.vrm", this.scene, (meshes) => {
      this.mesh.avatar = meshes;
      const vrmManager = this.scene.metadata.vrmManagers[0];
      // this.scene.registerBeforeRender(() => {
      //   vrmManager.update(this.scene.getEngine().getDeltaTime());
      //   this.makePose(vrmManager);
      // });
      console.log(vrmManager.humanoidBone); // TODO: all bones null
    });
  }

  listeners() {
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  testScene() {
    const camera = new FreeCamera(
      "camera",
      new Vector3(0, 1.5, -2.5),
      this.scene
    );

    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.7;

    // create skybox
    const skybox = MeshBuilder.CreateBox("skybox", { size: 1000 }, this.scene);
    const skyMaterial = new SkyMaterial("skyMaterial", this.scene);
    skyMaterial.backFaceCulling = false;
    skyMaterial.luminance = 1;
    skyMaterial.turbidity = 2;
    skyMaterial.inclination = 0;
    skybox.material = skyMaterial;

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  destroy() {
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }

  makePose(manager: any) {
    Object.keys(poses).forEach((boneName) => {
      if (!manager.humanoidBone[boneName]) {
        return;
      }
      //@ts-expect-error
      manager.humanoidBone[boneName].rotationQuaternion = poses[boneName];
    });
  }
}
