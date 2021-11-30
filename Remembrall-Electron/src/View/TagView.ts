import { createDeleteElmt } from "../Utils/FunctionUtils";
import { SearchListItem } from "./FilterView/SearchListView";

export class TagView {

    protected _elmt: Element;
    protected _text_elmt: Element;
    protected _text: string;
    protected _finish_btn_elmt: Element;

    constructor(text: string) {
        this._elmt = document.createElement("div");
        this.createTextElmt(text)
        this._elmt.appendChild(this._text_elmt);
        this._finish_btn_elmt = createDeleteElmt(this._elmt);
        this._elmt.appendChild(this._finish_btn_elmt);
        this._elmt.classList.add("tag");
        this._text = text;
    }
    private createTextElmt(text: string) {
        this._text_elmt = document.createElement("div");
        this._text_elmt.innerHTML = text;
        this._text_elmt.classList.add("tag-text");
    }

    public get elmt() {
        return this._elmt;
    }

    public get text() {
        return this._text;
    }
}

export class TagViewCheckable extends TagView implements SearchListItem {
    private _checkbox;
    constructor(text: string) {
        super(text);
        this._checkbox = this.createCheckbox();
        this._elmt.prepend(this._checkbox);
        this._elmt.id = "checkable-tag";
        this._finish_btn_elmt.remove();
    }

    private createCheckbox(): Element {
        var elmt = document.createElement("input")
        elmt.type = "checkbox";
        return elmt;
    }

    public get checkbox() {
        return this._checkbox;
    }
    public get text_elmt(): Element {
        return this._text_elmt
    }
}