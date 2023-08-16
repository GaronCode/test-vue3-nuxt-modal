export type ColorTypeVariants = "Red" | "Green" | "Blue";
export type ColorBackgroundVariants = "danger" | "succsess" | "info" | "hidden";

export interface IModalButtonSingle {
    text?: string;
    color?: ColorTypeVariants;
    icon?: string;
    onClick?: Function;
    noClose?: boolean;
}

export interface IModalInput {
    placeholder?: string;
    onChange: Function;
}

export interface IModalSettings {
    colorType?: ColorBackgroundVariants;
    header?: string;
    headerColor?: string;
    modalHeader?: string;
    closeTimer?: number;
    icon?: string;
    content?: string;
    contentToLeft?: boolean,
    buttons?: Array<IModalButtonSingle>;
    input?: IModalInput;
    chips?: number;
    
}
