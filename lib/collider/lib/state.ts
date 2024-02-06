import { IActor } from "./helpers";
import { Canvas } from "./canvas";

export class State {
  display: Canvas;
  actors: IActor[];

  constructor(display: Canvas, actors: IActor[]) {
    this.display = display;
    this.actors = actors;
  }

  update(time: number): State {
    const updateId = Math.floor(Math.random() * 1000000);
    const actors = this.actors.map((actor) => {
      return actor.update(this, time, updateId);
    });
    return new State(this.display, actors);
  }
}
