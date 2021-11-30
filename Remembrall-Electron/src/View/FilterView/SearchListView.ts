export class SearchListView {

    private _input_elmt: HTMLInputElement;
    private _list_elmt: Element;
    private _container_elmt: Element;
    private _search_items: SearchListItem[];

    constructor(id: string) {
        this._search_items = [];
        this.createView(id);
    }
    private createView(id: string) {
        this.createTagInputElmt(id);
        this.createTagListElmt(id);
    }
    private createTagInputElmt(id: string) {
        this.initTagInputElmt(id);
        this.addTagInputElmtListener();
    }
    private initTagInputElmt(id: string) {
        this._input_elmt = document.createElement("input");
        this._input_elmt.id = id + "-input";
        this._input_elmt.placeholder = "Tag"
        this._input_elmt.type = "text";
    }
    private addTagInputElmtListener() {
        this._input_elmt.addEventListener("input", () => {
            this._search_items.forEach(item => {
                if (item.text_elmt.innerHTML.toLowerCase().indexOf(this._input_elmt.value) == -1) item.elmt.classList.add("invisible");
                else item.elmt.classList.remove("invisible");
            });
        });
    }

    private createTagListElmt(id: string) {
        this.initTagListElmt(id);
        this._container_elmt = document.createElement("div");
        this._container_elmt.id = id + "-container";
        this._container_elmt.appendChild(this._input_elmt)
        this._container_elmt.appendChild(this._list_elmt);
    }

    private initTagListElmt(id: string) {
        this._list_elmt = document.createElement("div");
        this._list_elmt.id = id + "-list";
    }

    public get tag_list_elmt() {
        return this._list_elmt;
    }

    public get container_elmt(): Element {
        return this._container_elmt;
    }

    public addSearchListItem(item: SearchListItem) {
        this._search_items.push(item);
        this._list_elmt.appendChild(item.elmt);
    }
}

export interface SearchListItem {
    get elmt(): Element;
    get text_elmt(): Element;
}