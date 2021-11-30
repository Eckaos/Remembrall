import { Month } from "./Month";

export class Year {
    private _months: Month[] = [];
    private year: number;
    constructor(year: number) {
        this.year = year;
        for (let i = 0; i < 12; i++) {
            this._months[i] = new Month(i, year);
        }
    }

    public get months(): Month[] {
        return this._months;
    }


}