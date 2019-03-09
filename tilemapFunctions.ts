namespace util {
    export class SearchMap {
        constructor(public readonly data: MapData, public readonly left: number, public readonly top: number) {
        }
    }

    export function bfs(data: MapData, col: number, row: number, range: number, mask = 0xffff): SearchMap {
        const out = new MapData((range << 1) + 1, (range << 1) + 1);
        out.allocate();
        const queue: Point[] = [];

        out.setTile(range, range, 1);
        queue.push(new Point(col, row));

        let current: Point;
        let currentValue: number;

        const minX = col - range;
        const minY = row - range;
        const maxX = col + range;
        const maxY = row + range;

        while (queue.length) {
            current = queue.shift();
            currentValue = out.getTile(current.x - minX, current.y - minY)
            if (currentValue > range) continue;

            if (current.x > minX && !out.getTile(current.x - minX - 1, current.y - minY)) {
                if (mask & data.getTile(current.x - 1, current.y)) {
                    out.setTile(current.x - minX - 1, current.y - minY, currentValue + 1);
                    queue.push(new Point(current.x - 1, current.y))
                }
            }
            if (current.x < maxX && !out.getTile(current.x - minX + 1, current.y - minY)) {
                if (mask & data.getTile(current.x + 1, current.y)) {
                    out.setTile(current.x - minX + 1, current.y - minY, currentValue + 1);
                    queue.push(new Point(current.x + 1, current.y))
                }
            }
            if (current.y > minY && !out.getTile(current.x - minX, current.y - minY - 1)) {
                if (mask & data.getTile(current.x, current.y - 1)) {
                    out.setTile(current.x - minX, current.y - minY - 1, currentValue + 1);
                    queue.push(new Point(current.x, current.y - 1))
                }
            }
            if (current.y < maxY && !out.getTile(current.x - minX, current.y - minY + 1)) {
                if (mask & data.getTile(current.x, current.y + 1)) {
                    out.setTile(current.x - minX, current.y - minY + 1, currentValue + 1);
                    queue.push(new Point(current.x, current.y + 1))
                }
            }
        }

        return new SearchMap(out, minX, minY);
    }

    export function markSearchMap(sm: SearchMap, region: Region) {
        for (let c = 0; c < sm.data.width; c++) {
            for (let r = 0; r < sm.data.height; r++) {
                region.setTile(sm.left + c, sm.top + r, !!sm.data.getTile(c, r))
            }
        }
    }
} 