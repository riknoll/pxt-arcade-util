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
}