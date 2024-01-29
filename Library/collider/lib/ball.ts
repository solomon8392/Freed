import { ISquare } from "./box";
import {
  IActor,
  calculateCircleCollision,
  calculateSquareCollision,
  collisionVector,
} from "./helpers";
import { State } from "./state";
import { Vector } from "./vector";

export interface Image {
  src: HTMLImageElement;
  width: number;
  height: number;
}

export interface ICircle extends IActor {
  type: "circle";
  radius: number;
  image: Image;
}

export class Ball implements ICircle {
  id: number;
  type: "circle";
  position: Vector;
  velocity: Vector;
  radius: number;
  color: string;
  collisions: number[];
  fixed?: boolean | undefined;
  image: Image;

  constructor({
    id = Math.floor(Math.random() * 1000000),
    position = new Vector(100, 100),
    velocity = new Vector(5, 3),
    radius = 25,
    color = "blue",
    collisions = [],
    fixed = false,
    image,
  }: Partial<ICircle> = {}) {
    this.id = id;
    this.type = "circle";
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.collisions = collisions;
    this.fixed = fixed;
    this.image = image as Image;
  }

  update(state: State, time: number, updateId: number): Ball {
    if (this.collisions.length > 10) {
      this.collisions = this.collisions.slice(this.collisions.length - 3);
    }

    state.actors.forEach((actor) => {
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        return;
      }

      if (actor.fixed) {
        switch (actor.type) {
          case "circle":
            calculateCircleCollision(this, actor as ICircle);
            break;

          case "square":
            calculateSquareCollision(this, actor as ISquare);
            break;

          default:
            break;
        }
      } else {
        const distance = this.position
          .add(this.velocity)
          .subtract(actor.position.add(actor.velocity)).magnitude;

        if (distance <= this.radius + (actor as ICircle).radius) {
          const v1 = collisionVector(this, actor);
          const v2 = collisionVector(actor, this);
          this.velocity = v1;
          actor.velocity = v2;
          this.collisions.push(actor.id + updateId);
          actor.collisions.push(this.id + updateId);
        }
      }
    });

    // Setting bounds on the canvas prevents balls from overlapping on update.
    const upperLimit = new Vector(
      state.display.canvas.width - this.radius,
      state.display.canvas.height - this.radius
    );
    const lowerLimit = new Vector(this.radius, this.radius);

    // Check if hitting left or right of container.
    if (this.position.x >= upperLimit.x || this.position.x <= lowerLimit.x) {
      this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    }

    // Check if hitting top or bottom of container.
    if (this.position.y >= upperLimit.y || this.position.y <= lowerLimit.y) {
      this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    }

    const newX = Math.max(
      Math.min(this.position.x + this.velocity.x, upperLimit.x),
      lowerLimit.x
    );
    const newY = Math.max(
      Math.min(this.position.y + this.velocity.y, upperLimit.y),
      lowerLimit.y
    );

    return new Ball({
      ...this,
      position: new Vector(newX, newY),
    });
  }

  get area(): number {
    return Math.PI * this.radius ** 2;
  }

  get sphereArea(): number {
    return 4 * Math.PI * this.radius ** 2;
  }
}
