namespace util {
    export class ShapeSprite implements SpriteLike {
        z: number;
        id: number;
        protected color: number;
        protected dead: boolean;
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
            this.color = 1;
            this.dead = false;
            this.fixed = false;
            game.currentScene().addSprite(this);
        }

        setColor(color: number) {
            this.color = color;
        }

        getColor() {
            return this.color;
        }

        setFixed(fixed: boolean) {
            this.fixed = fixed;
        }

        isFixed() {
            return this.fixed;
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
            // TODO
            return null;
        }

        destroy() {
            if (!this.dead) {
                this.dead = true;
                game.currentScene().allSprites.removeElement(this);
            }
        }

        protected isVisible(screenLeft: number, screenTop: number, screenRight: number, screenBottom: number) {
            return !((this.left > screenRight) || (this.right < screenLeft) || (this.top > screenBottom) || (this.bottom < screenTop));
        }

        protected drawCore(offsetX: number, offsetY: number) {

        }
    }

    export class RectangleSprite extends ShapeSprite {
        constructor(public readonly left: number, public readonly top: number, public readonly width: number, public readonly height: number) {
            super();
        }

        get right() {
            return this.left + this.width;
        }

        get bottom() {
            return this.top + this.height;
        }

        protected drawCore(offsetX: number, offsetY: number) {
            screen.drawRect(this.left - offsetX, this.top - offsetY, this.width, this.height, this.color);
        }
    }

    export class LineSprite extends ShapeSprite {
        constructor(public readonly x0: number, public readonly y0: number, public readonly x1: number, public readonly y1: number) {
            super();
        }

        get left() {
            return Math.min(this.x0, this.x1);
        }

        get right() {
            return Math.max(this.x0, this.x1);
        }

        get top() {
            return Math.min(this.y0, this.y1)
        }

        get bottom() {
            return Math.max(this.y0, this.y1)
        }

        protected drawCore(offsetX: number, offsetY: number) {
            screen.drawLine(this.x0 - offsetX, this.y0 - offsetY, this.x1 - offsetX, this.y1 - offsetY, this.color);
        }
    }

    export class TextSprite extends ShapeSprite {
        constructor(public readonly left: number, public readonly top: number, protected text: string, protected readonly font: image.Font) {
            super();
        }

        get right() {
            return this.left + this.font.charWidth * this.text.length;
        }

        get bottom() {
            return this.top + this.font.charHeight;
        }

        setText(text: string) {
            this.text = text;
        }

        protected drawCore(offsetX: number, offsetY: number) {
            screen.print(this.text, this.left - offsetX, this.top - offsetY, this.color, this.font);
        }
    }
} 