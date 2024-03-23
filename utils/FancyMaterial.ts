import { MeshPhongMaterial } from "three";

export class FancyMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      specular: 0x111111,
      shininess: 100,
    });
  }
}
