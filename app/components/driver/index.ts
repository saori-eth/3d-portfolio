import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";

const BASE_URL = "https://saori-content.s3.amazonaws.com/";

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  constructor(props: DriverProps) {
    this.canvas = props.canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

    this.setupScene(); // Setup the scene without starting the render loop
    this.listeners();
    this.loadVRM(`${BASE_URL}803.vrm`);
    this.startRendering(); // Start the render loop
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
  }

  // This method can be called externally to start the rendering
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

  private loadVRM(url: string): void {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm;
        this.scene.add(vrm.scene);
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
  }
}
