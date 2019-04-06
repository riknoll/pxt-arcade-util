namespace util {
    export class CursorSprite extends AnchoredSprite {
        protected offset: number;
        protected period: number;
        protected timer: number;

        protected controlsEnabled: boolean;

        constructor(tileWidth = 16) {
            super(tileWidth, tileWidth);
            this.offset = 0;
            this.period = 0.15;
            this.timer = this.period;
        }

        __update(camera: scene.Camera, dt: number): void {
            this.timer -= dt;

            while (this.timer < 0) {
                this.timer += this.period;
                this.offset = (this.offset + 1) % 5;
            }
        }

        protected drawCore(left: number, top: number) {
            for (let i = 0; i < this.width; i++) {
                if (!((i + this.offset) % 5)) continue;
                screen.setPixel(left + this.width - 1 - i, top, 15);
                screen.setPixel(left + this.width - 1, top + this.height - 1 - i, 15);
                screen.setPixel(left, top + i, 15);
                screen.setPixel(left + i, top + this.height - 1, 15);
            }
        }

        moveTo(col: number, row: number) {
            this.anchor.x = col * this.width;
            this.anchor.y = row * this.width;
        }

        setControlsEnabled(enabled: boolean) {
            this.controlsEnabled = enabled;
        }
    }
}