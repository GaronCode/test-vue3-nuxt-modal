import { IModalSettings } from "./useModal.types";

export let modalDataObject = {
    isActive: false,
    frontConnected: false,
    triggerStack: [] as Array<IModalSettings>,
    show: () => {},
    hide: () => {},
    awaitClose: (): Promise<Boolean> => {
        return new Promise((r) => r(false));
    },
    open: (e: IModalSettings) => {},
    activate: async function () {
        if (this.isActive) return;
        this.isActive = true;
        let i = 0;
        for (; i < this.triggerStack.length; i++) {
            const e = this.triggerStack[i];
            this.open(e);
            this.show();
            await this.awaitClose();
        }
        this.triggerStack.splice(0, i);
        this.isActive = false;

        if (this.triggerStack.length > 0) this.activate();
    },
};

export const useModal = (settings: IModalSettings) => {
    return {
        show() {
            modalDataObject.triggerStack.push(settings);
            if (modalDataObject.frontConnected) modalDataObject.activate();
        },
        hide() {},
    };
};
