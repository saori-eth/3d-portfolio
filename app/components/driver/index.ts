import { Engine, Scene, MeshBuilder, Vector3, HemisphericLight, ArcRotateCamera } from 'babylonjs';

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
    const camera = new ArcRotateCamera('camera', 0, 0, 0, new Vector3(0, 0, 0), this.scene);
    camera.setPosition(new Vector3(0, 0, -10));
    camera.attachControl(this.canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);

    const box = MeshBuilder.CreateBox('box', { size: 2 }, this.scene);

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