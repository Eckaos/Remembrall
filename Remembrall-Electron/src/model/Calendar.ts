import { Year } from "./Year";

export class Calendar {
    private _years: Year[];
    public selected_day: Date;
    private _today_date: Date;
    private first_year: number;

    //TODO implements Year which have Month[]
    //Calendar replace Month[] by Year[]
    constructor() {
        this._years = [];
        var dt = new Date();
        this.first_year = dt.getFullYear();
        this._years[0] = new Year(this.first_year);
        this._today_date = dt;
        this.selected_day = dt;
    }

    public get years(): Year[] {
        return this._years;
    }

    public get todayDate(): Date {
        return this._today_date;
    }

    public getIndexOfYear(year: number): number {
        return year - this.first_year;
    }
    public year(year: number): Year {
        var index = year - this.first_year;
        if (index < 0) return null;
        if (this._years[this.getIndexOfYear(year)] == null) this.newYear(year);
        return this._years[index];
    }

    public newYear(year: number) {
        this._years[this.getIndexOfYear(year)] = new Year(year);
    }
}