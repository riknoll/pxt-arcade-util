namespace util {
    export class UpdaterService {
        private static instance: UpdaterService;

        static getService() {
            if (!UpdaterService.instance) {
                UpdaterService.instance = new UpdaterService();
            }
            return UpdaterService.instance;
        }

        protected updaters: Updater[];

        private constructor() {
            this.updaters = [];

            let lastTime = game.runtime();
            let time: number;
            let dt: number;
            game.onUpdate(() => {
                time = game.runtime();
                dt = time - lastTime;

                this.updaters.forEach(u => u.update(dt))

                lastTime = time;
            });
        }

        addUpdater(updater: Updater) {
            this.updaters.push(updater);
        }

        removeUpdater(updater: Updater) {
            this.updaters.removeElement(updater);
        }
    }

    export class Updater {
        protected running: boolean;

        constructor() {
            this.running = false;
        }

        isRunning() {
            return this.running;
        }

        start() {
            if (this.isRunning()) return;

            UpdaterService.getService().addUpdater(this);
            this.running = true;
        }

        stop() {
            if (this.isRunning()) {
                this.running = false;
                UpdaterService.getService().removeUpdater(this);
            }
        }

        update(dt: number) {
            // subclass
        }
    }

    export class IntervalUpdater extends Updater {
        protected timer: number;
        protected interval: number;

        constructor(interval: number) {
            super();
            this.interval = interval;
            this.timer = 0;
        }

        update(dt: number) {
            this.timer += dt;
            while (this.timer > this.interval) {
                this.timer -= this.interval;
                this.onInterval();
            }
        }

        onInterval() {
            // subclass
        }
    }
}