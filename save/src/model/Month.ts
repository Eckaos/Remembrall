import { monthsName } from "../Utils/DateUtils";

export class Month {
    private _days: Date[];
    constructor(month: number, year: number) {
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        this._days = [];
        for (let index = 1; index <= daysInMonth; index++) {
            this._days[index - 1] = new Date(year, month, index);
        }
    }

    public get days(): Date[] {
        return this._days;
    }
}