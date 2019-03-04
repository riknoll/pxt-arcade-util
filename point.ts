namespace util {
    export class Point {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    export class MapLocation {
        readonly col: number;
        readonly row: number;

        constructor(col: number, row: number) {
            this.col = col;
            this.row = row;
        }
    }
} 