import {
  Engine,
  Scene,
  MeshBuilder,
  Vector3,
  HemisphericLight,
  FreeCamera,
  SceneLoader,
} from "babylonjs";
import { SkyMaterial } from "babylonjs-materials";
import "babylonjs-loaders";

const BASE_URL = "https://saori-content.s3.amazonaws.com/";

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  mesh: any;
  constructor(props: DriverProps) {
    this.canvas = props.canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.mesh = {
      // avatar: Mesh[]
    };
    this.listeners();
    this.testScene();
    this.loadGlb();
  }

  async loadGlb() {
    SceneLoader.ImportMesh("", BASE_URL, "noun3d.glb", this.scene, (meshes) => {
      meshes.forEach((mesh) => {
        mesh.rotation = new Vector3(0, Math.PI, 0);
        mesh.position.z = -7.5;
        mesh.position.y = -0.25;
      });
      this.mesh.avatar = meshes;
    });
  }

  listeners() {
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  testScene() {
    const camera = new FreeCamera("camera", new Vector3(0, 0, -10), this.scene);
    camera.setTarget(Vector3.Zero());

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
}
