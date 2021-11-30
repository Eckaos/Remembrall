export class SuggestionInput {

    private _input_elmt;
    private _suggestions_elmt;

    constructor(id: string) {
        this.createView(id);
    }

    private createView(id: string) {
        this._input_elmt = document.createElement("input");
        this._suggestions_elmt = document.createElement("datalist");
        this.init(id);
    }
    private init(id: string) {
        this.initTitleInputElmt(id);
        this.initDataInputElmt(id);
    }
    private initTitleInputElmt(id: string) {
        this._input_elmt.id = id + "-suggestion-input";
        this._input_elmt.type = "text";
        this._input_elmt.placeholder = id;
        this._input_elmt.setAttribute("list", id + "-suggestions");
    }
    private initDataInputElmt(id: string) {
        this._suggestions_elmt.id = id + "-suggestions";
    }

    public get input_elmt() {
        return this._input_elmt
    }

    public get suggestions_elmt() {
        return this._suggestions_elmt
    }

    public addSuggestion(title: string) {
        var option = document.createElement("option");
        option.value = title;
        this.suggestions_elmt.appendChild(option);
    }

}