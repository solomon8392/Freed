import { IActor } from "./helpers";
import { State } from "./state";
import { Vector } from "./vector";

export interface ISquare extends IActor {
  type: "square";
  width: number;
  height: number;
}

export class Box implements ISquare {
  id: number;
  type: "square";
  position: Vector;
  velocity: Vector;
  width: number;
  height: number;
  color: string;
  collisions: number[];
  fixed?: boolean;

  constructor({
    id = Math.floor(Math.random() * 1000000),
    position = new Vector(100, 100),
    velocity = new Vector(0, 0),
    width = 400,
    height = 400,
    color = "blue",
    collisions = [],
    fixed = false,
  }: Partial<ISquare> = {}) {
    this.id = id;
    this.type = "square";
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.color = color;
    this.collisions = collisions;
    this.fixed = fixed;
  }

  update(state: State, time: number, updateId: number): Box {
    if (this.collisions.length > 10) {
      this.collisions = this.collisions.slice(this.collisions.length - 3);
    }

    state.actors.forEach((actor) => {
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        return;
      }
    });

    return new Box({
      ...this,
    });
  }

  get area(): number {
    return this.width * this.height;
  }
}
