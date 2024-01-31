import * as THREE from "three";
import { VRMSystem } from "./systems";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const BASE_URL = "https://saori-content.s3.amazonaws.com/";

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  vrmSystem: VRMSystem;

  constructor(props: DriverProps) {
    this.canvas = props.canvas;
    this.vrmSystem = new VRMSystem(this);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

    this.setupScene();
    this.listeners();
    this.vrmSystem.load(`${BASE_URL}803.vrm`);
    this.startRendering();
  }

  setupScene(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Add a light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Set the camera position
    this.camera.position.z = 1.5;
    this.camera.position.y = 1.75;

    // Add controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0.0, 1.0, 0.0);
    controls.update();

    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }

  startRendering(): void {
    const animate = (): void => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  private listeners(): void {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
