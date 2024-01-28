import { RefObject } from "react";
import { IActor } from "./helpers";
import { State } from "./state";
import { ISquare } from "./box";
import { ICircle } from "./ball";

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
  }
}
