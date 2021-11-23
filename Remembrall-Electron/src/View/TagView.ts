import { createDeleteElmt } from "../Utils/FunctionUtils";

export class TagView {

    protected _elmt: Element;

    constructor(text: string) {
        this._elmt = document.createElement("div");
        this._elmt.appendChild(this.createTextElmt(text));
        this._elmt.appendChild(createDeleteElmt(this._elmt));
        this._elmt.classList.add("tag");
    }
    private createTextElmt(text: string): Element {
        var elmt = document.createElement("div");
        elmt.innerHTML = text;
        elmt.classList.add("tag-text");
        return elmt;
    }

    public get elmt() {
        return this._elmt;
    }
}

export class TagViewCheckable extends TagView {
    private _checkbox;
    constructor(text: string) {
        super(text);
        this._checkbox = this.createCheckbox();
        this._elmt.prepend(this._checkbox);
        this._elmt.id = "checkable-tag";
    }
    private createCheckbox(): Element {
        var elmt = document.createElement("input")
        elmt.type = "checkbox";
        return elmt;
    }


    public get checkbox() {
        return this._checkbox;
    }

}