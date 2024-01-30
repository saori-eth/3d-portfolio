const BASE_URL = "https://saori-content.s3.amazonaws.com/";

interface DriverProps {
  canvas: HTMLCanvasElement;
}

export class Driver {
  canvas: HTMLCanvasElement;
  constructor(props: DriverProps) {
    this.canvas = props.canvas;
  }
}
