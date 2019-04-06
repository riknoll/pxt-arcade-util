namespace util {
    export class TileMap extends BaseSprite {
        protected GridTileShader: TileShader;
        protected gridVisible: boolean;
        protected regionData: RegionData;

        constructor(public readonly data: MapData, public readonly tileWidth = 16) {
            super();
            this.GridTileShader = new GridTileShader(tileWidth);
            this.gridVisible = false;
        }

        get right() {
            return this.tileWidth * this.data.width;
        }

        get bottom() {
            return this.tileWidth * this.data.height;
        }

        protected drawCore(offsetX: number, offsetY: number) {
            const x0 = Math.max(0, (offsetX / this.tileWidth) | 0);
            const xn = Math.min(this.data.width, (((offsetX + screen.width) / this.tileWidth) | 0) + 1);
            const y0 = Math.max(0, (offsetY / this.tileWidth) | 0);
            const yn = Math.min(this.data.height, (((offsetY + screen.height) / this.tileWidth) | 0) + 1);

            let left = this.scaleLength(x0) - offsetX;
            let top = this.scaleLength(y0) - offsetY;
            let regions = this.regionData ? this.regionData.regions.filter(r => !!(r && r.getShader())) : [];
            let value: number;
            for (let x = x0; x < xn; ++x) {
                top = this.scaleLength(y0) - offsetY;;
                for (let y = y0; y < yn; ++y) {
                    value = this.data.getTile(x, y);
                    this.drawTile(left, top, value);

                    for (const region of regions) {
                        if (region.checkTile(x, y)) region.getShader().shadeTile(left, top, value);
                    }

                    this.shadeTile(left, top, value);

                    top += this.tileWidth;
                }
                left += this.tileWidth;
            }
        }

        protected drawTile(left: number, top: number, value: number) {
            screen.fillRect(left, top, this.tileWidth, this.tileWidth, value);
        }

        protected shadeTile(left: number, top: number, value: number) {
            if (this.gridVisible) this.GridTileShader.shadeTile(left, top, value);
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

        setGridTileShader(shader: TileShader) {
            this.GridTileShader = shader;
        }

        showGrid() {
            this.gridVisible = true;
        }

        hideGrid() {
            this.gridVisible = false;
        }

        regions() {
            if (!this.regionData) this.regionData = new RegionData();
            return this.regionData;
        }
    }

    export class MapData {
        protected data: Buffer;
        protected tileBytes: number;
        protected rowWidth: number;

        constructor(public readonly width: number, public readonly height: number, public readonly format = NumberFormat.UInt8LE) {
            this.tileBytes = pins.sizeOf(format);
            this.rowWidth = this.tileBytes * width;
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
            return col * this.tileBytes + row * this.rowWidth
        }

        protected size() {
            return this.height * this.rowWidth;
        }
    }

    export enum Layer {
        Layer1 = 1,
        Layer2 = 2,
        Layer3 = 4,
        Layer4 = 8
    }

    export class RegionData {
        protected data: Image;
        public regions: Region[];

        constructor(protected maxWidth = 16, protected readonly maxHeight = 16) {
            this.data = image.create(maxWidth, maxHeight);
            this.regions = [];
        }

        setTile(region: Layer, col: number, row: number, value: boolean) {
            const old = this.data.getPixel(col, row);
            if (old & region) {
                if (!value) {
                    this.data.setPixel(col, row, old ^ region);
                }
            }
            else if (value) {
                this.data.setPixel(col, row, old | region);
            }
        }

        checkTile(region: Layer, col: number, row: number): number {
            return this.data.getPixel(col, row) & region;
        }

        newRegion(width: number, height: number) {
            if (this.regions.length > 3) return undefined;

            if (width > this.maxWidth || height > this.maxHeight) {
                this.grow(width, height);
            }

            const reg = new Region(this, 1 << this.regions.length, width, height);
            this.regions.push(reg);
            return reg;
        }

        getRegion(layer: Layer) {
            return this.regions[layerToIndex(layer)];
        }

        overwriteRegion(layer: Layer, width: number, height: number) {
            const index = layerToIndex(layer);
            if (this.regions[layer]) this.regions[layer].clear();

            this.regions[index] = new Region(this, layer, width, height);
        }

        protected grow(maxWidth: number, maxHeight: number) {
            const newData = image.create(maxWidth, maxHeight);
            newData.drawImage(this.data, 0, 0);
            this.data = newData;
        }
    }

    export class Region {
        protected left: number;
        protected top: number;
        protected shader: TileShader;

        constructor(protected readonly data: RegionData, public readonly layer: Layer, public readonly width: number, public readonly height: number) {
            this.left = 0;
            this.top = 0;
        }

        setOffset(left: number, top: number) {
            this.left = left;
            this.top = top;
        }

        setTile(col: number, row: number, value: boolean) {
            col -= this.left;
            row -= this.top;
            if (col >= 0 && col < this.width && row >= 0 && row < this.height) this.data.setTile(this.layer, col, row, value);
        }

        checkTile(col: number, row: number) {
            col -= this.left;
            row -= this.top;
            if (col >= 0 && col < this.width && row >= 0 && row < this.height) return this.data.checkTile(this.layer, col, row);
            return 0;
        }

        setShader(shader: TileShader) {
            this.shader = shader;
        }

        getShader() {
            return this.shader;
        }

        clear() {
            for (let c = 0; c < this.width; c++) {
                for (let r = 0; r < this.height; r++) {
                    this.setTile(c, r, false);
                }
            }
        }
    }

    export class TileShader {
        constructor(public readonly tileWidth = 16) {
        }

        shadeTile(offsetX: number, offsetY: number, tileValue: number) {

        }
    }

    export class GridTileShader extends TileShader {
        protected color: number;

        constructor(tileWidth = 16) {
            super(tileWidth);
            this.color = 15;
        }

        shadeTile(offsetX: number, offsetY: number, tileValue: number) {
            const right = offsetX + this.tileWidth - 1;
            const bottom = offsetY + this.tileWidth - 1;
            for (let offset = 0; offset < this.tileWidth; offset += 2) {
                screen.setPixel(offsetX + offset, bottom, this.color)
                screen.setPixel(right, offsetY + offset, this.color)
            }
        }
    }

    export class PaletteTileShader extends TileShader {
        constructor(tileWidth = 16, public readonly palette: Buffer) {
            super(tileWidth);
        }

        shadeTile(offsetX: number, offsetY: number, tileValue: number) {
            screen.mapRect(offsetX, offsetY, this.tileWidth, this.tileWidth, this.palette);
        }
    }

    export class ColorTileShader extends TileShader {
        constructor(tileWidth = 16, public readonly color: number) {
            super(tileWidth);
        }

        shadeTile(offsetX: number, offsetY: number, tileValue: number) {
            screen.fillRect(offsetX, offsetY, this.tileWidth, this.tileWidth, this.color);
        }
    }

    function layerToIndex(layer: Layer): number {
        switch (layer) {
            case Layer.Layer1: return 0;
            case Layer.Layer2: return 1;
            case Layer.Layer3: return 2;
            case Layer.Layer4: return 3;
        }
    }
}