namespace util.vector {
    export function reflectVector(incoming: Point, normal: Point) {
        return subVector(incoming, scaleVector(2 * dotProduct(incoming, normal), normal));
    }

    export function dotProduct(a: Point, b: Point) {
        return a.x * b.x + a.y * b.y;
    }

    export function addVector(a: Point, b: Point) {
        return new Point(a.x + b.x, a.y + b.y);
    }

    export function addToVector(a: Point, b: Point) {
        a.x += b.x;
        a.y += b.y;
        return a;
    }

    export function subVector(a: Point, b: Point) {
        return new Point(a.x - b.x, a.y - b.y);
    }

    export function subFromVector(a: Point, b: Point) {
        a.x -= b.x;
        a.y -= b.y;
        return a;
    }

    export function scaleVector(scalar: number, vector: Point) {
        return new Point(scalar * vector.x, scalar * vector.y);
    }

    export function scaleVectorBy(scalar: number, vector: Point) {
        vector.x *= scalar;
        vector.y *= scalar;
        return vector;
    }

    export function magnitude(vector: Point) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    }

    export function sumVectors(vectors: Point[]) {
        return vectors.reduce(addToVector, new Point(0, 0));
    }

    export function averageVectors(vectors: Point[]) {
        return scaleVector(1 / vectors.length, sumVectors(vectors));
    }

    export function normalize(vector: Point) {
        const mag = magnitude(vector);
        return mag ? scaleVector(1 / mag, vector) : vector;
    }

    export class LineSegment {
        protected xDiff: number;
        protected yDiff: number;
        protected dl: number;
        protected length: number;

        public collisionPoint: Point;
        public normal: Point;

        constructor(public p0: Point, public p1: Point) {
            this.xDiff = p0.x - p1.x;
            this.yDiff = p0.y - p1.y;
            this.dl = this.xDiff * this.xDiff + this.yDiff * this.yDiff;
            this.length = Math.sqrt(this.dl);
            this.collisionPoint = new Point(0, 0);

            const normal = Math.atan2(this.yDiff, this.xDiff) + (Math.PI / 2);
            this.normal = new Point(
                Math.cos(normal),
                Math.sin(normal)
            );
        }

        distanceFrom(p: Point) {
            return Math.idiv(Math.abs(this.xDiff * (p.y - this.p0.y) - this.yDiff * (p.x - this.p0.x)), this.length);
        }

        intersectsWithCircle(p: Point, radius: number) {
            const dist = this.distanceFrom(p);

            if (dist < radius) {
                const t = ((p.x - this.p0.x) * this.xDiff + (p.y - this.p0.y) * this.yDiff) / this.dl;
                const dt = Math.sqrt(radius * radius + dist * dist) / this.length;
                const t1 = t - dt;
                const t2 = t + dt;

                if ((t1 > -1 && t1 < 0) || (t2 > -1 && t2 < 0)) {
                    this.collisionPoint.x = this.p0.x + t * this.xDiff;
                    this.collisionPoint.y = this.p0.y + t * this.yDiff;
                    return true;
                }
            }
            return false;
        }

        draw(canvas: Image, camera: scene.Camera, color = 1) {
            canvas.drawLine(
                this.p0.x - camera.offsetX,
                this.p0.y - camera.offsetY,
                this.p1.x - camera.offsetX,
                this.p1.y - camera.offsetY,
                color);
        }

        projectedNormal(distance: number) {
            return new Point(
                distance * this.normal.x,
                distance * this.normal.y
            );
        }
    }

    export class Polygon {
        public sides: LineSegment[]

        constructor(points: Point[]) {
            this.sides = [new LineSegment(points[points.length - 1], points[0])];
            for (let i = 0; i < points.length - 1; i++) {
                this.sides.push(new LineSegment(points[i], points[i + 1]))
            }
        }

        intersectsWithCircle(p: Point, radius: number) {
            let hit: LineSegment;
            this.sides.forEach(l => hit = (l.intersectsWithCircle(p, radius) ? l : null) || hit);
            return hit
        }

        draw(canvas: Image, camera: scene.Camera, color = 1) {
            this.sides.forEach(l => l.draw(canvas, camera, color));
        }
    }
}