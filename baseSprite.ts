namespace util {
    export class BaseSprite implements SpriteLike {
        z: number;
        id: number;

        protected fixed: boolean;

        get left() {
            return 0;
        }

        get right() {
            return 0;
        }

        get top() {
            return 0;
        }

        get bottom() {
            return 0;
        }

        constructor() {
            this.z = 0;
            this.fixed = false;
        }

        setFixed(fixed: boolean) {
            this.fixed = fixed;
        }

        isFixed() {
            return this.fixed;
        }

        show() {
            if (this.id) return;
            game.currentScene().addSprite(this);
        }

        hide() {
            if (!this.id) return;
            game.currentScene().allSprites.removeElement(this);
            this.id = undefined;
        }

        __update(camera: scene.Camera, dt: number): void {
        }

        __draw(camera: scene.Camera): void {
            if (this.fixed) {
                this.drawCore(0, 0);
            }
            else if (this.isVisible(camera.offsetX, camera.offsetY, camera.offsetX + screen.width, camera.offsetY + screen.height)) {
                this.drawCore(camera.offsetX, camera.offsetY);
            }
        }

        __serialize(offset: number): Buffer {
            return null;
        }

        protected isVisible(screenLeft: number, screenTop: number, screenRight: number, screenBottom: number) {
            return !((this.left > screenRight) || (this.right < screenLeft) || (this.top > screenBottom) || (this.bottom < screenTop));
        }

        protected drawCore(offsetX: number, offsetY: number) {
            // Subclass
        }
    }

    export class AnchoredSprite extends BaseSprite {
        public anchor: Anchor;

        constructor(public width: number, public height: number) {
            super();
            this.anchor = new Point(0, 0);
        }

        get left() {
            return this.anchor.x
        }

        set left(left: number) {
            this.anchor.x = left;
        }

        get top() {
            return this.anchor.y;
        }

        set top(top: number) {
            this.anchor.y = top;
        }

        get right() {
            return this.left + this.width;
        }

        set right(right: number) {
            this.left = right - this.width;
        }

        get bottom() {
            return this.top + this.height;
        }

        set bottom(bottom: number) {
            this.top = bottom - this.height;
        }

        centerOn(x: number, y: number) {
            this.left = x - (this.width >> 1)
            this.top = y - (this.height >> 1)
        }

        __draw(camera: scene.Camera): void {
            if (this.fixed) {
                this.drawCore(this.anchor.x, this.anchor.y);
            }
            else if (this.isVisible(camera.offsetX, camera.offsetY, camera.offsetX + screen.width, camera.offsetY + screen.height)) {
                this.drawCore(this.anchor.x - camera.drawOffsetX, this.anchor.y - camera.drawOffsetY);
            }
        }
    }
}
