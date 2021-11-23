import { Calendar } from "../model/Calendar";
import { Task } from "../model/Task";
import { getFirstDayOfWeek, monthsName, transformDateToFileName, transformDateToFrDate, weekDay } from "../Utils/DateUtils";
import { fromJson, fs, getTaskPath, toJson } from "../Utils/JSONUtils";
import { CalendarView } from "./CalendarView";
import { TaskMakerView } from "./TaskMakerView";
import { FilterView } from "./FilterView";
import { TaskView } from "./TaskView";


export class TaskListView {
    private _taskArray: Task[];
    private _task_list_elmt: Element;
    private _filter_view: FilterView;
    private _calendar_view: CalendarView;
    private _title_elmt: Element;
    private _calendar: Calendar;

    constructor(task_list_elmt: Element, title_elmt: Element, filter_view: FilterView, calendar_view: CalendarView, calendar: Calendar) {
        this._taskArray = [];
        this._task_list_elmt = task_list_elmt;
        this._filter_view = filter_view;
        this._calendar_view = calendar_view;
        this._title_elmt = title_elmt;
        this._calendar = calendar;
        filter_view.task_list_view = this;
        calendar_view.task_list_view = this;
    }

    public get taskArray(): Task[] {
        return this._taskArray;
    }


    public update() {
        this.loadTasks();
        this.display();
    }

    private display() {
        this.clearView();
        for (let i = 0; i < this._taskArray.length; i++) {
            const task = this._taskArray[i];
            if (!task.priority && this._filter_view.getPriorityActive()) continue;
            if (this._filter_view.themes.length > 0 && this._filter_view.isThemeStrict() && !equals(this._filter_view.themes, task.tags)) continue;//strict
            if (this._filter_view.themes.length > 0 && !this._filter_view.isThemeStrict() && !task.tags.some(theme => this._filter_view.themes.includes(theme))) continue;//non strict
            this._task_list_elmt.appendChild(new TaskView(this, task).elmt);
        }
    }

    private loadTasks() {
        this._taskArray = [];
        switch (this._filter_view.getTimeRange()) {
            case 0:
                this.loadOneDay();
                break;
            case 1:
                this.loadWeek();
                break;
            case 2:
                this.loadMonth();
                break;
            default:
                this.loadOneDay();
                break;
        }
        this._filter_view.updateThemes(this._taskArray);
    }

    private loadOneDay() {
        var file = transformDateToFileName(this._calendar.selected_day) + ".json";
        if (fs.existsSync(getTaskPath(file))) this._taskArray = fromJson(getTaskPath(file));
        this._title_elmt.innerHTML = weekDay[this._calendar.selected_day.getDay()] + " " + transformDateToFrDate(this._calendar.selected_day);
    }

    private loadWeek() {
        var d = getFirstDayOfWeek(this._calendar.selected_day)
        this._title_elmt.innerHTML = "Week of " + transformDateToFrDate(d);
        for (let i = 0; i < 7; i++) {
            var file = transformDateToFileName(d) + ".json";
            if (fs.existsSync(getTaskPath(file))) this._taskArray = this._taskArray.concat(fromJson(getTaskPath(file)));
            d.setDate(d.getDate() + 1);
        }
    }

    private loadMonth() {
        var day_number: number = new Date(this._calendar_view.year, this._calendar_view.month, 0).getDate();
        for (let i = 1; i <= day_number; i++) {
            var d: Date = new Date(this._calendar_view.year, this._calendar_view.month, i);
            var file = transformDateToFileName(d) + ".json";
            if (fs.existsSync(getTaskPath(file))) this._taskArray = this._taskArray.concat(fromJson(getTaskPath(file)));
        }
        this._title_elmt.innerHTML = monthsName[this._calendar_view.month];
    }

    private clearView() {
        this._task_list_elmt.innerHTML = '';
    }

    public removeTask(task: Task) {
        this.taskArray.splice(this.taskArray.indexOf(task), 1);
        var taskFilePath: string = getTaskPath(transformDateToFileName(new Date(task.date)) + ".json");
        var taskArrayFromTaskDate: Task[] = fromJson(taskFilePath);
        taskArrayFromTaskDate.splice(taskArrayFromTaskDate.indexOf(task), 1);
        if (taskArrayFromTaskDate.length === 0) fs.unlinkSync(taskFilePath);
        else toJson(taskArrayFromTaskDate, taskFilePath);
        this._filter_view.updateThemes(this.taskArray);
    }

}

function equals(array1: Array<any>, array2: Array<any>): boolean {
    if (!array1 || !array2) return false;
    if (array1.length != array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!array1[i].equals(array2[i])) return false;
        } else if (array1[i] != array2[i]) return false;
    }
    return true;
}