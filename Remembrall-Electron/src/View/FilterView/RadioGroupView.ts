export class RadioGroupView {
    private _radio_elmts: Element;
    private id: string;


    //TODO changer les noms d'id
    constructor(id: string, id_list: string[]) {
        this.id = id;
        this.createMainElmt(id);
        id_list.forEach(id_radio => {
            this.createTimeRangeView(id_radio, id)
        })
        this.init(id);
    }

    private createMainElmt(id: string) {
        this._radio_elmts = document.createElement("div");
        this._radio_elmts.id = id;
    }
    private createTimeRangeView(range: string, id_list: string): any {
        var time_range = document.createElement("input");
        var time_label = document.createElement("label");
        this.initTimeRange(time_range, range, id_list);
        this.initLabel(time_label, range);
        this._radio_elmts.appendChild(time_range);
        this._radio_elmts.appendChild(time_label);
    }
    private initTimeRange(time_range: HTMLInputElement, range: string, id_list: string) {
        time_range.type = "radio"
        time_range.id = range + "-radio"
        time_range.name = id_list
    }
    private initLabel(time_label: HTMLLabelElement, range: string) {
        time_label.innerHTML = range;
        time_label.setAttribute("for", range + "-radio");
    }

    private init(id_list: string) {
        (this._radio_elmts.querySelectorAll("input[name=" + id_list + "]").item(0) as HTMLInputElement).checked = true;
    }

    public getCheckedRadio(): number {
        var i: number = 0;
        for (const time_range of this._radio_elmts.querySelectorAll("input[name=" + this.id + "]")) {
            if ((time_range as HTMLInputElement).checked) return i;
            i++;
        }
        return -1;
    }

    public get radio_elmts() {
        return this._radio_elmts
    }

}