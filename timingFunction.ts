namespace util {
    export interface TimingFunction {
        moveTo(target: Sprite, t: number): void;
    }

    export class CubicBezierCurve implements TimingFunction {
        protected p0x: number;
        protected p0y: number;
        protected p1x: number;
        protected p1y: number;
        protected p2x: number;
        protected p2y: number;
        protected p3x: number;
        protected p3y: number;

        setAnchor(p0: Point, p3: Point) {
            this.p0x = p0.x;
            this.p0y = p0.y;
            this.p3x = p3.x;
            this.p3y = p3.y;
        }

        setControl(p1: Point, p2: Point) {
            this.p1x = p1.x;
            this.p1y = p1.y;
            this.p2x = p2.x;
            this.p2y = p2.y;
        }

        setP0(x: number, y: number) {
            this.p0x = x;
            this.p0y = y
        }

        setP1(x: number, y: number) {
            this.p1x = x;
            this.p1y = y
        }

        setP2(x: number, y: number) {
            this.p2x = x;
            this.p2y = y
        }

        setP3(x: number, y: number) {
            this.p3x = x;
            this.p3y = y
        }

        moveTo(target: Sprite, t: number) {
            const diff = 1 - t;
            const a = diff * diff * diff;
            const b = 3 * diff * diff * t;
            const c = 3 * diff * t * t;
            const d = t * t * t;

            target.x = (a * this.p0x + b * this.p1x + c * this.p2x + d * this.p3x) | 0;
            target.y = (a * this.p0y + b * this.p1y + c * this.p2y + d * this.p3y) | 0;
        }
    }

    export class QuadraticBezierCurve implements TimingFunction {
        protected p0x: number;
        protected p0y: number;
        protected p1x: number;
        protected p1y: number;
        protected p2x: number;
        protected p2y: number;

        setAnchor(p0: Point, p2: Point) {
            this.p0x = p0.x;
            this.p0y = p0.y;
            this.p2x = p2.x;
            this.p2y = p2.y;
        }

        setControl(p1: Point) {
            this.p1x = p1.x;
            this.p1y = p1.y;
        }

        setP0(x: number, y: number) {
            this.p0x = x;
            this.p0y = y
        }

        setP1(x: number, y: number) {
            this.p1x = x;
            this.p1y = y
        }

        setP2(x: number, y: number) {
            this.p2x = x;
            this.p2y = y
        }

        moveTo(target: Sprite, t: number) {
            const diff = 1 - t;
            const a = diff * diff;
            const b = 2 * diff * t;
            const c = t * t;

            target.x = (a * this.p0x + b * this.p1x + c * this.p2x) | 0;
            target.y = (a * this.p0y + b * this.p1y + c * this.p2y) | 0;
        }
    }

    export class TimingFunctionAnimation extends Updater {
        protected timer: number;
        protected period: number;
        protected loop: boolean;
        protected onFunctionEnd: () => void;

        constructor(protected readonly func: TimingFunction, protected readonly target: Sprite) {
            super();

            this.target.data = {
                lastX: 0,
                lasty: 0
            }

            this.period = 1000;
            this.loop = false;
        }

        start() {
            if (!this.isRunning()) {
                this.timer = this.period;
                super.start();
            }
        }

        setPeriod(period: number) {
            this.period = period;
        }

        setLoop(loop: boolean) {
            this.loop = loop;
        }

        onEnd(cb: () => void) {
            this.onFunctionEnd = cb;
        }

        update(dt: number) {
            this.timer -= dt;
            if (this.timer < 0) {
                this.func.moveTo(this.target, 1);
                if (this.loop) {
                    this.timer = this.period;
                }
                else {
                    this.stop();
                }

                if (this.onFunctionEnd) this.onFunctionEnd();
            }
            else {
                this.target.data.lastX = this.target.x;
                this.target.data.lastY = this.target.y;
                this.func.moveTo(this.target, (this.period - this.timer) / this.period);
            }
        }
    }
}