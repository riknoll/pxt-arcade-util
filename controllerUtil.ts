namespace util {
    enum ButtonState {
        PressedThisFrame,
        HeldThisFrame,
        ReleasedThisFrame,
        UpThisFrame,
    }

    export class ControllerTracker extends Updater {
        protected buttons: ButtonState[];
        constructor() {
            super();
            this.buttons = [];
        }

        protected updateButton(index: number, pressed: boolean) {
            let next: ButtonState;

            switch (this.buttons[index]) {
                case ButtonState.PressedThisFrame:
                    next = pressed ? ButtonState.HeldThisFrame : ButtonState.ReleasedThisFrame;
                    break;
                case ButtonState.HeldThisFrame:
                    next = pressed ? ButtonState.HeldThisFrame : ButtonState.ReleasedThisFrame;
                    break;
                case ButtonState.ReleasedThisFrame:
                    next = pressed ? ButtonState.PressedThisFrame : ButtonState.UpThisFrame;
                    break;
                case ButtonState.UpThisFrame:
                    next = pressed ? ButtonState.PressedThisFrame : ButtonState.UpThisFrame;
                    break;
            }

            this.buttons[index] = next;
        }
    }
}