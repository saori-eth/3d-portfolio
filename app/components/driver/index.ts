import { Engine, Scene, MeshBuilder, Vector3, HemisphericLight, FreeCamera, StandardMaterial, CubeTexture, Texture, Color3, PBRMaterial } from 'babylonjs';
import { SkyMaterial } from 'babylonjs-materials';

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  constructor(props: DriverProps) {
    this.canvas = props.canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.listeners();
    this.testScene();
  }

  listeners() {
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  testScene() {
    const camera = new FreeCamera('camera', new Vector3(0, 0, -10), this.scene);
    camera.setTarget(Vector3.Zero());

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    const box = MeshBuilder.CreateBox('box', { size: 2 }, this.scene);

    // create skybox
    const skybox = MeshBuilder.CreateBox('skybox', {size: 1000}, this.scene);
    const skyMaterial = new SkyMaterial("skyMaterial", this.scene);
    skyMaterial.backFaceCulling = false;
    // Adjust these parameters for a night time or outer space look
    skyMaterial.luminance = 1;  // Lower luminance for a darker sky
    skyMaterial.turbidity = 2;    // Lower turbidity for less haze
    skyMaterial.inclination = 0;  // Adjust the inclination for the position of the stars/moon
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