export interface IVector {
  x: number;
  y: number;
}

export class Vector implements IVector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  dotProduct(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector {
    return this.divide(this.magnitude);
  }

  get direction(): number {
    return Math.atan2(this.y, this.x);
  }
}
