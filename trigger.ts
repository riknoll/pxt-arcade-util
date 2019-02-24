namespace util {
    export type Action<U> = (trigger: U) => void;

    export class EventTrigger extends Updater {
        protected repeat: boolean;

        constructor(protected readonly action: Action<EventTrigger>, repeat = false) {
            super();
            this.repeat = repeat;
        }

        update(dt: number) {
            if (this.checkTrigger(dt)) {
                this.doAction();

                if (this.repeat) {
                    this.reset();
                }
                else {
                    this.stop();
                }
            }
        }

        setRepeat(repeat: boolean) {
            this.repeat = repeat;
        }

        doAction(stop = false) {
            this.action(this);

            if (stop) {
                this.stop();
            }
        }

        reset() {
            if (!this.isRunning()) {
                this.start();
            }
        }

        protected checkTrigger(dt: number): boolean {
            // Subclass
            return true;
        }
    }

    export enum TileTriggerBehavior {
        // Only trigger when a sprite enters the area
        TriggerOnEntrance,

        // Only trigger when a sprite exits the area
        TriggerOnExit,

        // Trigger when a sprite enters or exits
        TriggerOnEntranceOrExit,

        // Trigger whenever a sprite is in the area
        TriggerOnAny
    }

    export class TileTrigger extends EventTrigger {
        protected topLeft: MapLocation;
        protected tileWidth: number;
        protected tileHeight: number;

        protected kind: number;
        protected behavior: TileTriggerBehavior;

        protected triggeredOn: Sprite[];

        constructor(action: Action<TileTrigger>, repeat = false) {
            super(action, repeat);

            this.kind = 0;
            this.behavior = TileTriggerBehavior.TriggerOnEntrance;
        }

        setArea(topLeft: MapLocation, tileWidth = 1, tileHeight = 1) {
            this.topLeft = topLeft;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;
        }

        setBehavior(behavior: TileTriggerBehavior) {
            this.behavior = behavior;
        }

        setKind(kind: number) {
            this.kind = kind;
        }

        getTargetSprites() {
            return this.triggeredOn;
        }

        protected checkTrigger(dt: number) {
            if (this.topLeft) {
                this.triggeredOn = sprites.allOfKind(this.kind).filter(sprite => {
                    switch (this.behavior) {
                        case TileTriggerBehavior.TriggerOnEntrance:
                            return !this.inAreaLastFrame(sprite) && this.inAreaThisFrame(sprite);
                        case TileTriggerBehavior.TriggerOnExit:
                            return this.inAreaLastFrame(sprite) && !this.inAreaThisFrame(sprite);
                        case TileTriggerBehavior.TriggerOnEntranceOrExit:
                            const inLast = this.inAreaLastFrame(sprite);
                            const inThis = this.inAreaThisFrame(sprite);
                            return (inLast && !inThis) || (!inLast && inThis);
                        case TileTriggerBehavior.TriggerOnAny:
                            return this.inAreaThisFrame(sprite)
                    }
                });

                return !!this.triggeredOn.length;
            }

            return false;
        }

        protected inArea(col: number, row: number) {
            return !(col < this.left || col > this.right || row < this.top || row > this.bottom);
        }

        protected inAreaLastFrame(sprite: Sprite) {
            // console.log(`(${(Fx.toInt(sprite._lastX) + (sprite.width >> 1)) >> 4}, ${(Fx.toInt(sprite._lastY) + (sprite.height >> 1)) >> 4}) (${sprite.x >> 4}, ${sprite.y >> 4})`)
            return this.inArea(sprite.data.lastX >> 4, sprite.data.lastY >> 4);
        }

        protected inAreaThisFrame(sprite: Sprite) {
            return this.inArea(sprite.x >> 4, sprite.y >> 4);
        }

        protected get left() {
            return this.topLeft.col;
        }

        protected get top() {
            return this.topLeft.row;
        }

        protected get right() {
            return this.left + this.tileWidth - 1;
        }

        protected get bottom() {
            return this.top + this.tileHeight - 1;
        }
    }
}