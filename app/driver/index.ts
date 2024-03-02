import * as THREE from "three";
import { VRMSystem } from "./systems";
import ThreeMeshUI from "three-mesh-ui";
// import { OrbitControls } from "three/examples/jsm/Addons.js";

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  loadingManager: THREE.LoadingManager;
  progressCallback?: (progress: number) => void;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  vrmSystem: VRMSystem;
  lookAtTarget: THREE.Object3D;
  clock: THREE.Clock;

  constructor(props: DriverProps) {
    this.canvas = props.canvas;
    this.vrmSystem = new VRMSystem(this);
    this.scene = new THREE.Scene();
    this.loadingManager = new THREE.LoadingManager();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.lookAtTarget = new THREE.Object3D();
    this.camera.add(this.lookAtTarget);
    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.setupScene();
    this.listeners();
    this.vrmSystem.load("/avatar/avatar.vrm", "/avatar/avatar@idle.fbx");
    this.startRendering();
  }

  test(): void {
    console.log("test");
  }

  public onProgress(callback: (progress: number) => void): void {
    this.progressCallback = callback;
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = itemsLoaded / itemsTotal;
      if (this.progressCallback) this.progressCallback(progress);
      console.log(`Loading file: ${url} (${itemsLoaded}/${itemsTotal})`);
    };
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
    this.camera.position.z = 0.5;
    this.camera.position.y = 1.35;
    this.camera.far = 2000;
    this.camera.updateProjectionMatrix(); // apply new far value

    // Add orbit controls
    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.target.set(0, 1.35, 0);
    // controls.update();

    // skysphere
    const loader = new THREE.TextureLoader(this.loadingManager);
    const texture = loader.load("/skybox/mtn.png");
    const geometry = new THREE.SphereGeometry(1000, 60, 40);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    // mesh textbox
    const mesh = new ThreeMeshUI.Block({
      width: 0.5,
      height: 0.55,
      fontFamily: "/font/Roboto-msdf.json",
      fontTexture: "/font/Roboto-msdf.png",
      borderRadius: 0.05,
      borderWidth: 0.01,
      borderOpacity: 0.25,
      borderColor: new THREE.Color("white"),
      padding: 0.05,
    });
    mesh.position.set(0.2, 1.35, -0.5);
    mesh.rotation.y = -0.25;

    const header = new ThreeMeshUI.Text({
      content: "Hi there!",
      fontColor: new THREE.Color("white"),
    });
    mesh.add(header);

    const bullets = [
      "\n - I'm a Typescript & Solidity dev",
      "\n - I've been full time trading crypto since 2021",
      "\n - Contributed to DeFi, SoFi, Memecoins and Metaverse projects",
    ];

    bullets.forEach((bullet) => {
      const p = new ThreeMeshUI.Text({
        content: bullet,
        fontColor: new THREE.Color("white"),
        fontSize: 0.035,
      });
      mesh.add(p);
    });

    this.scene.add(mesh);
  }

  startRendering(): void {
    const animate = (): void => {
      requestAnimationFrame(animate);
      const delta = this.clock.getDelta();
      this.vrmSystem.update(delta);
      ThreeMeshUI.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  listeners(): void {
    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event: MouseEvent): void {
    this.lookAtTarget.position.x =
      10.0 * ((event.clientX - 0.5 * window.innerWidth) / window.innerHeight);
    this.lookAtTarget.position.y =
      -10.0 * ((event.clientY - 0.5 * window.innerHeight) / window.innerHeight);
  }

  destroy(): void {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
    window.removeEventListener("mousemove", this.onMouseMove.bind(this));
  }
}
