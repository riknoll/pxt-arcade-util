namespace util {
    export class TileMap extends AnchoredSprite {
        constructor(public data: MapData, public tileWidth = 16) {
            super(data.width * tileWidth, data.height * tileWidth);
        }

        protected drawCore(offsetX: number, offsetY: number) {
            const x0 = Math.max(0,(offsetX / this.tileWidth) | 0);
            const xn = Math.min(this.data.width, (((offsetX + screen.width) / this.tileWidth) | 0) + 1);
            const y0 = Math.max(0, (offsetY / this.tileWidth) | 0);
            const yn = Math.min(this.data.height, (((offsetY + screen.height) / this.tileWidth) | 0) + 1);

            for (let x = x0; x <= xn; ++x) {
                for (let y = y0; y <= yn; ++y) {
                    this.drawTile(x, y, offsetX, offsetY);
                }
            }
        }

        protected drawTile(col: number, row: number, offsetX: number, offsetY: number) {
            screen.fillRect(this.scaleLength(col) - offsetX, this.scaleLength(row) - offsetY, this.tileWidth, this.tileWidth, this.data.getTile(col, row));
        }

        scaleLength(lengthInTiles: number) {
            return this.tileWidth * lengthInTiles;
        }

        centerSpriteOn(target: AnchoredSprite, col: number, row: number) {
            target.centerOn(this.scaleLength(col) + (this.tileWidth >> 1), this.scaleLength(row) + (this.tileWidth >> 1))
        }

        centerCameraOn(col: number, row: number) {
            scene.centerCameraAt(this.scaleLength(col) + (this.tileWidth >> 1), this.scaleLength(row) + (this.tileWidth >> 1))
        }
    }

    export class MapData {
        protected data: Buffer;
        protected tileSize: number;
        protected rowWidth: number;

        constructor(public readonly width: number, public readonly height: number, public readonly format = NumberFormat.UInt8LE) {
            this.tileSize = pins.sizeOf(format);
            this.rowWidth = this.tileSize * width;
        }

        getTile(col: number, row: number): number {
            return this.data.getNumber(this.format, this.indexOf(col, row));
        }

        setTile(col: number, row: number, value: number): void {
            this.data.setNumber(this.format, this.indexOf(col, row), value);
        }

        setFlag(col: number, row: number, flag: number, on: boolean) {
            let val = this.getTile(col, row);
            if (val & flag) {
                if (!on) {
                    val ^= flag;
                } 
            }
            else if (on) {
                val = val | flag;
            }
            this.setTile(col, row, val);
        }

        checkFlag(col: number, row: number, flag: number): number {
            return this.getTile(col, row) & flag;
        }

        allocate() {
            this.data = control.createBuffer(this.size());
        }

        destroy() {
            this.data = undefined;
        }

        setData(data: Buffer) {
            if (data.length != this.size()) control.panic(222);
            this.data = data;
        }

        protected indexOf(col: number, row: number) {
            return col * this.tileSize + row * this.rowWidth
        }

        protected size() {
            return this.height * this.rowWidth;
        }
    }
}