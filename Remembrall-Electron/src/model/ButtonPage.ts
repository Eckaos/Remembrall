var content = document.querySelector('#content')
export class ButtonPage {
    private _name: string;
    private _content: HTMLElement;
    private _button: Element;
    constructor(name: string, button: Element) {
        this._button = button;
        this._name = name;
    }

    public get getName(): string {
        return this._name
    }

    public get getContent(): HTMLElement {
        return this._content;
    }

    public set setContent(v: HTMLElement) {
        this._content = v;
    }

    public get getButton(): Element {
        return this._button;
    }
}