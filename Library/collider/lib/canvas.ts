import { RefObject } from "react";
import { ICircle } from "./ball";
import { ISquare } from "./box";
import { State } from "./state";

export interface ICanvasConfig {
  width?: number;
  height?: number;
  canvasParentRef?: RefObject<HTMLDivElement>;
  count?: number;
}

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor({
    canvasParentRef = undefined,
    width = 400,
    height = 400,
  }: ICanvasConfig = {}) {
    this.canvas = document.createElement("canvas");
    const dpi = window.devicePixelRatio;
    this.canvas.width = width * dpi * 2;
    this.canvas.height = height * dpi * 2;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    canvasParentRef?.current?.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;
  }

  sync(state: State): void {
    this.clearDisplay();
    this.drawActors(state.actors as ICircle[] | ISquare[]);
  }

  clearDisplay(): void {
    this.ctx.fillStyle = "rgba(255, 255, 255, .2)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawActors(actors: ICircle[] | ISquare[]): void {
    actors.forEach((actor) => {
      if (actor.type === "circle") {
        this.drawCircle(actor);
      } else if (actor.type === "square") {
        this.drawSquare(actor);
      }
    });
  }

  drawCircle(actor: ICircle): void {
    this.ctx.translate(0.5, 0.5);
    this.ctx.beginPath();
    this.ctx.arc(
      actor.position.x,
      actor.position.y,
      actor.radius,
      0,
      Math.PI * 2
    );
    this.ctx.closePath();
    this.ctx.fillStyle = actor.color;
    this.ctx.fill();
    this.ctx.translate(-0.5, -0.5);
    if (actor.image) {
      this.ctx.drawImage(
        actor.image.src,
        actor.position.x - actor.image.width / 2,
        actor.position.y - actor.image.height / 2,
        actor.image.width,
        actor.image.height
      );
    }
  }

  drawSquare(actor: ISquare): void {
    this.ctx.beginPath();
    this.ctx.rect(
      actor.position.x,
      actor.position.y,
      actor.width,
      actor.height
    );
    this.ctx.closePath();
    this.ctx.fillStyle = actor.color;
    this.ctx.fill();
    if (actor.text) {
      this.ctx.font = actor.font;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "black"; // Set the text color
      this.ctx.fillText(
        actor.text,
        actor.position.x + actor.width / 2,
        actor.position.y + actor.height / 2
      );
    }
  }
}
