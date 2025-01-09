import { Vector2 } from "./vector2";

/**
 * Represents a sprite for rendering in a 2D environment.
 */
export class Sprite {
  /**
   * @param {Object} options - The configuration options for the sprite.
   * @param {HTMLImageElement|HTMLCanvasElement} options.resource - The image or canvas resource to draw.
   * @param {number[]} options.frameSize - The width and height of the cropped frame [width, height].
   * @param {number} [options.hFrames=1] - The number of frames arranged horizontally.
   * @param {number} [options.vFrames=1] - The number of frames arranged vertically.
   * @param {number} [options.frame=0] - The index of the frame to display.
   * @param {number} [options.scale=1] - The scale at which to draw the image.
   * @param {number[]} options.position - The position [x, y] to draw the top-left corner of the sprite.
   */
  constructor({
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx, x, y) {
    if(!this.resource.isLoaded) {
      return;
    }

    //find correct sprite sheet frame to use

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if(frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // Top Y corner of frame
      frameSizeX, // How much to crop from the sprite sheet (X)
      frameSizeY, // How much to crop from the sprite sheet (Y)
      x, // Where to place this on canvas tag X (0)
      y, // Where to place this on canvas tag Y (0)
      frameSizeX * this.scale, // How large to scale it (X)
      frameSizeY * this.scale, // How large to scale it (Y)
    )
  }
}
