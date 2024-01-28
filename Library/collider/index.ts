import { Ball, ICircle } from "./lib/ball";
import { Box, ISquare } from "./lib/box";
import { Canvas, ICanvasConfig } from "./lib/canvas";
import { IActor, colors, random, runAnimation } from "./lib/helpers";
import { State } from "./lib/state";
import { Vector } from "./lib/vector";

const collider = ({
  width = 1400,
  height = 500,
  canvasParentRef = undefined,
  count = 22,
}: ICanvasConfig = {}): void => {
  const display = new Canvas({ canvasParentRef, width, height });
  const floaters: (ICircle | ISquare)[] = []; // Use union type here
  let createdCount = 0;
  let smallerCreatedCount = 0;

  const box = new Box({
    width: 2000,
    height: 600,
    color: "black",
    position: new Vector(width * 2 - 2000 / 2, height * 2 - 600 / 2),
    velocity: new Vector(0, 0),
    fixed: true,
  });

  floaters.push(box);

  while (createdCount < count) {
    const newBall = new Ball({
      radius: random(150, 250) + Math.random(),
      color: colors[random(colors.length - 1)],
      position: new Vector(
        random(width * 4 - 10, 10),
        random(height * 4 - 10, 10)
      ),
      velocity: new Vector(random(1, -1), random(1, -1)),
    });

    let positionIsValid = true;
    for (const otherFloater of floaters) {
      const otherFloaterRadius =
        "radius" in otherFloater ? otherFloater.radius : 0; // Check for radius if it's a circle
      const otherFloaterDiagonal =
        "width" in otherFloater && "height" in otherFloater
          ? Math.sqrt(
              Math.pow(otherFloater.width, 2) + Math.pow(otherFloater.height, 2)
            )
          : 0; // Check for diagonal if it's a square

      if (
        newBall.position.add(newBall.velocity).subtract(
          otherFloater.type === "square" && otherFloater.fixed
            ? new Vector((width * 4) / 2, (height * 4) / 2) // simulate the square origin point being at the center of canvas
            : otherFloater.position.add(otherFloater.velocity)
        ).magnitude <
        newBall.radius +
          Math.max(otherFloaterRadius + 200, otherFloaterDiagonal / 2)
      ) {
        positionIsValid = false;
        break;
      }
    }

    if (positionIsValid) {
      floaters.push(newBall);
      createdCount++;
    }
  }

  while (smallerCreatedCount < 10) {
    const newBall = new Ball({
      radius: random(10, 15) + Math.random(),
      color: "black",
      position: new Vector(
        random(width * 4 - 10, 5),
        random(height * 4 - 10, 3)
      ),
      velocity: new Vector(random(1, -1), random(1, -1)),
    });

    let positionIsValid = true;
    for (const otherFloater of floaters) {
      const otherFloaterRadius =
        "radius" in otherFloater ? otherFloater.radius : 0; // Check for radius if it's a circle
      const otherFloaterDiagonal =
        "width" in otherFloater && "height" in otherFloater
          ? Math.sqrt(
              Math.pow(otherFloater.width, 2) + Math.pow(otherFloater.height, 2)
            )
          : 0; // Check for diagonal if it's a square

      if (
        newBall.position.add(newBall.velocity).subtract(
          otherFloater.type === "square" && otherFloater.fixed
            ? new Vector((width * 4) / 2, (height * 4) / 2) // simulate the square origin point being at the center of canvas
            : otherFloater.position.add(otherFloater.velocity)
        ).magnitude <
        newBall.radius +
          Math.max(otherFloaterRadius + 150, otherFloaterDiagonal / 2)
      ) {
        positionIsValid = false;
        break;
      }
    }

    if (positionIsValid) {
      floaters.push(newBall);
      smallerCreatedCount++;
    }
  }

  let state = new State(display, floaters);
  runAnimation((time) => {
    state = state.update(time);
    display.sync(state);
  });
};

export default collider;
