import { ICircle } from "./ball";
import { ISquare } from "./box";
import { State } from "./state";
import { Vector } from "./vector";

export interface IActor {
  id: number;
  type: "circle" | "square";
  position: Vector;
  velocity: Vector;
  color: string;
  collisions: number[];
  update: (state: State, time: number, updateId: number) => IActor;
  area: number;
  fixed?: boolean;
}

export const colors: string[] = ["red", "green", "blue", "purple", "orange"];

export const collisionVector = (
  particle1: IActor,
  particle2: IActor
): Vector => {
  return particle1.velocity.subtract(
    particle1.position
      .subtract(particle2.position)
      .multiply(
        particle1.velocity
          .subtract(particle2.velocity)
          .dotProduct(particle1.position.subtract(particle2.position)) /
          particle1.position.subtract(particle2.position).magnitude ** 2
      )
      .multiply(1)
  );
};

export const isMovingTowards = (
  particle1: IActor,
  particle2: IActor
): boolean => {
  return (
    particle2.position
      .subtract(particle1.position)
      .dotProduct(particle1.velocity) > 0
  );
};

export const runAnimation = (
  animation: (timeStep: number) => boolean | void
): void => {
  let lastTime: number | null = null;
  const frame = (time: number): void => {
    if (lastTime !== null) {
      const timeStep = Math.min(100, time - lastTime) / 1000;
      if (animation(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

export const random = (max: number = 9, min: number = 0): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const calculateSquareCollision = (
  movingActor: ICircle,
  fixedSquareActor: ISquare
) => {
  // Find the closest point on the square to the center of the ball
  const closestPoint = new Vector(
    Math.max(
      fixedSquareActor.position.x,
      Math.min(
        movingActor.position.x,
        fixedSquareActor.position.x + fixedSquareActor.width
      )
    ),
    Math.max(
      fixedSquareActor.position.y,
      Math.min(
        movingActor.position.y,
        fixedSquareActor.position.y + fixedSquareActor.height
      )
    )
  );

  let normal: Vector | null = null;

  // Calculate the vector from the closest point on the square to the center of the ball
  const collisionVector = movingActor.position.subtract(closestPoint);

  // If the ball's center is inside the square, we need to find the minimum overlap
  if (collisionVector.magnitude <= movingActor.radius) {
    const distances = [
      movingActor.position.x - fixedSquareActor.position.x, // Left
      fixedSquareActor.position.x +
        fixedSquareActor.width -
        movingActor.position.x, // Right
      movingActor.position.y - fixedSquareActor.position.y, // Top
      fixedSquareActor.position.y +
        fixedSquareActor.height -
        movingActor.position.y, // Bottom
    ];
    const minDistance = Math.min(...distances);
    switch (distances.indexOf(minDistance)) {
      case 0:
        normal = new Vector(-1, 0); // Left normal
        break;
      case 1:
        normal = new Vector(1, 0); // Right normal
        break;
      case 2:
        normal = new Vector(0, -1); // Top normal
        break;
      case 3:
        normal = new Vector(0, 1); // Bottom normal
        break;
    }
  }

  if (normal) {
    const dotProduct = movingActor.velocity.dotProduct(normal);
    // Reflect the velocity vector across the normal vector
    movingActor.velocity = movingActor.velocity.subtract(
      normal.multiply(2 * dotProduct)
    );
  }
};

export const calculateCircleCollision = (
  movingActor: ICircle,
  fixedCircleActor: ICircle
) => {
  // Calculate the vector from the center of the static ball to the center of the moving ball
  const collisionVector = movingActor.position.subtract(
    fixedCircleActor.position
  );
  // Calculate the distance between the two balls
  const distance = collisionVector.magnitude;

  // Check if the balls are colliding
  if (distance < movingActor.radius + fixedCircleActor.radius) {
    // Calculate the normal vector at the point of collision
    const normal = collisionVector.normalize();
    // Calculate the dot product of the velocity and the normal
    const dotProduct = movingActor.velocity.dotProduct(normal);
    // Reflect the velocity vector across the normal vector
    movingActor.velocity = movingActor.velocity.subtract(
      normal.multiply(2 * dotProduct)
    );
  }
};
