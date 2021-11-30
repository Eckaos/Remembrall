import { Calendar } from "../model/Calendar";
import { weekDay, equals, monthsName, lesser } from "../Utils/DateUtils";
import { AgendaTaskListView } from "./TaskListView";

export class CalendarView {
    private _calendar: Calendar;
    private _calendar_elmt: Element;
    private _day_elmt: Element;
    private _task_list_view: AgendaTaskListView;

    private _year: number;
    private _month: number;

    constructor(calendar: Calendar, calendar_elmt: Element) {
        this._calendar = calendar;
        this._calendar_elmt = calendar_elmt;
        this._day_elmt = calendar_elmt.querySelector("#day");
        this._year = calendar.selected_day.getFullYear();
        this._month = calendar.selected_day.getMonth();
        this.createView();
    }


    public set task_list_view(v: AgendaTaskListView) {
        this._task_list_view = v;
    }


    private createView() {
        this.clearView();
        this._calendar_elmt.appendChild(this.createMonthElement());
        this._day_elmt = document.createElement("div");
        this._day_elmt.id = "day";
        this._calendar_elmt.appendChild(this._day_elmt);
        this.recreateDayLetters();
        this.createDays().forEach(day => this._day_elmt.appendChild(day));
    }


    private createDays(): Element[] {
        var days: Element[] = [];
        var first_day = new Date(this.year, this.month, 1);
        if (first_day.getDay() > 1) days = days.concat(this.createDaysFromLastMonth(first_day.getDay() - 1));
        if (first_day.getDay() == 0) days = days.concat(this.createDaysFromLastMonth(6));
        this._calendar.year(this.year).months[this.month].days.forEach(day => {
            days.push(this.createDayView(day));
        });
        days = days.concat(this.createDaysFromNextMonth(42 - days.length));
        return days;
    }

    private createDaysFromLastMonth(number_element: number): Element[] {
        var days: Element[] = [];
        var year: number = (this.month - 1 < 0) ? this.year - 1 : this.year;
        var month: number = (this.month - 1 < 0) ? 11 : this.month - 1;
        console.log(month, this._calendar.year(year).months[month].days.length)
        var dt = new Date(year, month, this._calendar.year(year).months[month].days.length);
        for (let i = number_element - 1; i >= 0; i--) {
            var day = new Date(year, month, 1);
            day.setDate(dt.getDate() - i);
            days.push(this.createDayView(day))
        }
        return days;
    }

    private createDaysFromNextMonth(number_element: number): Element[] {
        var days: Element[] = [];
        var dt = new Date(this.year, this.month + 1, 1);
        for (let i = 0; i < number_element; i++) {
            var day = new Date(this.year, this.month + 1, 1);
            day.setDate(dt.getDate() + i);
            days.push(this.createDayView(day))
        }
        return days;
    }

    private createDayView(day: Date): Element {
        var day_view: Element = document.createElement("div");
        day_view.innerHTML = day.getDate().toString();
        this.addDayClass(day_view, day);
        this.addDayEventListener(day_view, day);
        return day_view;
    }
    private addDayEventListener(day_view: Element, day: Date) {
        if (day_view.classList.length === 0) return;
        day_view.addEventListener("click", () => {
            if (day.getMonth() != this._month) {
                this._month = day.getMonth();
                this._year = day.getFullYear();
                this._calendar.selected_day = day;
                this.createView();
                this._task_list_view.update();
            } else {
                this._calendar_elmt.querySelector(".calendar-number-selected").classList.remove("calendar-number-selected");
                day_view.classList.add("calendar-number-selected");
                this._calendar.selected_day = day;
                this._task_list_view.update();
            }
        })
    }

    private addDayClass(day_view: Element, day: Date): void {
        day_view.classList.add("calendar-number");
        if (equals(day, this._calendar.selected_day)) {
            day_view.classList.add("calendar-number-selected")
        }
        if ((lesser(day, new Date()) && !(equals(day, this._calendar.selected_day)))) {
            day_view.classList.remove("calendar-number")
        }
    }

    private createMonthElement(): Element {
        var month_view = document.createElement("div");
        var month_view_text = document.createElement("div")
        var month_view_right_arrow: Element = this.createMonthRightArrow();
        var month_view_left_arrow: Element;
        if (!(new Date(this.year, this.month, 1) <= new Date())) {
            month_view_left_arrow = this.createMonthLeftArrow();
        } else {
            month_view_left_arrow = document.createElement("div");
            month_view_left_arrow.classList.add("calendar-arrow");
            month_view_left_arrow.setAttribute("style", "visibility: hidden;")
        }
        month_view.appendChild(month_view_left_arrow);
        month_view.appendChild(month_view_text);
        month_view.appendChild(month_view_right_arrow);
        month_view.classList.add("calendar-month");
        month_view_text.innerHTML = monthsName[this.month] + " " + this.year;
        return month_view;
    }

    private createMonthLeftArrow(): Element {
        var left_arrow = document.createElement("div");
        left_arrow.innerHTML = "←";
        left_arrow.classList.add("calendar-arrow");
        left_arrow.addEventListener("click", () => {
            if ((this.month - 1) < 0) {
                if (this._calendar.getIndexOfYear(this.year - 1) < 0) return;
                this._month = 11;
                this._year--;
            } else {
                this._month--;
            }
            this.clearView();
            this.createView();
            this._task_list_view.update();
        })
        return left_arrow;
    }

    private createMonthRightArrow(): Element {
        var right_arrow = document.createElement("div");
        right_arrow.innerHTML = "→";
        right_arrow.classList.add("calendar-arrow");
        right_arrow.addEventListener("click", () => {
            if (this.month + 1 > 11) {
                if (this._calendar.year(this.year + 1) == null) this._calendar.newYear(this.year + 1);
                this._month = 0;
                this._year++;

            } else {
                this._month++;
            }
            this.clearView();
            this.createView();
            this._task_list_view.update();
        })
        return right_arrow;
    }

    private clearView() {
        this._calendar_elmt.innerHTML = "";
    }

    private recreateDayLetters() {
        var sunday: Element;
        for (let i = 0; i < 7; i++) {
            if (i == 0) sunday = this.createDayLetter(i);
            else this._day_elmt.appendChild(this.createDayLetter(i));
        }
        this._day_elmt.appendChild(sunday);
    }

    private createDayLetter(index: number): Element {
        var day = document.createElement("div");
        day.innerHTML = weekDay[index].charAt(0);
        day.classList.add("calendar-day");
        return day;
    }

    public get year(): number {
        return this._year;
    }
    public get month(): number {
        return this._month;
    }
}