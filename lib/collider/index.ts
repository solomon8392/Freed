import { Ball, ICircle } from "./lib/ball";
import { Box, ISquare } from "./lib/box";
import { Canvas, ICanvasConfig } from "./lib/canvas";
import { colors, itemList, random, runAnimation } from "./lib/helpers";
import { State } from "./lib/state";
import { Vector } from "./lib/vector";

const collider = ({
  width = 1400,
  height = 500,
  canvasParentRef = undefined,
  count = 20,
}: ICanvasConfig = {}): void => {
  const display = new Canvas({ canvasParentRef, width, height });
  const floaters: (ICircle | ISquare)[] = []; // Use union type here
  let createdCount = 0;
  let smallerCreatedCount = 0;

  const box = new Box({
    width: 2000,
    height: 600,
    color: "",
    position: new Vector(width * 2 - 2000 / 2, height * 2 - 600 / 2),
    velocity: new Vector(0, 0),
    fixed: true,
    text: "Explore Bounties!",
    font: "250px 'Protest Riot'",
  });

  floaters.push(box);

  // Randomly choose the starting index
  const startIndex = Math.floor(Math.random() * itemList.length);

  const loadImages = async () => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    const imagePromises = itemList.map((selectedItem) =>
      loadImage(selectedItem)
    );
    return Promise.all(imagePromises);
  };

  let loadFont = new FontFace(
    "Protest Riot",
    "url(https://fonts.gstatic.com/s/protestriot/v2/d6lPkaOxWMKm7TdezXFmpkr80PhhrGd5OQ.woff2)"
  );

  loadFont.load().then((font) => {
    document.fonts.add(font);
    loadImages().then((images) => {
      while (createdCount < count) {
        let positionIsValid = true;

        const selectedItemIndex = (startIndex + createdCount) % itemList.length;
        const svgImage = images[selectedItemIndex];

        const radius = Math.min(svgImage.width / 2.2, svgImage.height / 2.2);

        const newBall = new Ball({
          radius,
          color: colors[random(colors.length - 1)],
          position: new Vector(
            random(width * 4 - (10 + radius), 10 + radius),
            random(height * 4 - (10 + radius), 10 + radius)
          ),
          velocity: new Vector(random(0.2, -0.2), random(0.2, -0.2)),
          image: {
            src: svgImage,
            width: svgImage.width / 1.2,
            height: svgImage.height / 1.2,
          },
        });

        for (const otherFloater of floaters) {
          const otherFloaterRadius =
            "radius" in otherFloater ? otherFloater.radius : 0; // Check for radius if it's a circle
          const otherFloaterDiagonal =
            "width" in otherFloater && "height" in otherFloater
              ? Math.sqrt(
                  Math.pow(otherFloater.width, 2) +
                    Math.pow(otherFloater.height, 2)
                )
              : 0; // Check for diagonal if it's a square

          if (
            newBall.position.add(newBall.velocity).subtract(
              otherFloater.type === "square" && otherFloater.fixed
                ? new Vector((width * 4) / 2, (height * 4) / 2) // simulate the square origin point being at the center of canvas
                : otherFloater.position.add(otherFloater.velocity)
            ).magnitude <=
            newBall.radius +
              Math.max(otherFloaterRadius, otherFloaterDiagonal / 2)
          ) {
            positionIsValid = false;
          }
        }

        if (positionIsValid) {
          floaters.push(newBall);
          createdCount++;
        }
      }

      while (smallerCreatedCount < 15) {
        const newBall = new Ball({
          radius: random(10, 15) + Math.random(),
          color: "black",
          position: new Vector(
            random(width * 4 - 50, 50),
            random(height * 4 - 50, 50)
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
                  Math.pow(otherFloater.width, 2) +
                    Math.pow(otherFloater.height, 2)
                )
              : 0; // Check for diagonal if it's a square

          if (
            newBall.position.add(newBall.velocity).subtract(
              otherFloater.type === "square" && otherFloater.fixed
                ? new Vector((width * 4) / 2, (height * 4) / 2) // simulate the square origin point being at the center of canvas
                : otherFloater.position.add(otherFloater.velocity)
            ).magnitude <
            newBall.radius +
              Math.max(otherFloaterRadius + 100, otherFloaterDiagonal / 2)
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
    });
  });
};

export default collider;
