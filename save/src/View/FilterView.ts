import { Task } from "../model/Task";
import { priorityListener } from "../Utils/FunctionUtils";
import { TagViewCheckable } from "./TagView";
import { TaskListView } from "./TaskListView";

export class FilterView {

    private _filters_elmt: Element;

    private _time_range_elmts;
    private _priority_btn_elmt;
    private _tag_input_elmt;
    private _tag_list_elmt: HTMLElement;

    private _themes: string[];
    private _themes_checked: string[];
    private _strictness_btn_elmt;

    private _task_list_view: TaskListView;
    private _task_title_input_filter;


    //TODO make the listener
    constructor(filters_elmt: Element) {
        this._filters_elmt = filters_elmt;
        this.makeView();
        this._themes = [];
        this._themes_checked = [];
        this._tag_list_elmt.style.height = this._tag_list_elmt.style.height + 'px';
        this.inputThemeEventListener();
        this.addTimeRangeEventListener();
        this.addThemeStrictnessListener();
    }
    private makeView() {
        this._filters_elmt.innerHTML = "Filters";
        this.createTitleInputFilter();
        this.createTimeRangeFilters();
        this.createPriorityElmt();
        this.createStrictnessElmt();
        this.createTagInputElmt();
        this.createTagListElmt();
    }
    private createTitleInputFilter() {
        var elmt = document.createElement("input");
        elmt.id = "task-title-input-filter";
        elmt.type = "text";
        elmt.placeholder = "Task title"
        elmt.addEventListener("click", () => {
            //TODO faire l'event listener && regarder video html sur les balise stylé
        });
        this._filters_elmt.appendChild(elmt);
    }
    private createTimeRangeFilters() {
        this._time_range_elmts = document.createElement("div");
        this._time_range_elmts.id = "time-range"
        this.createTimeRangeFilter("day");
        this.createTimeRangeFilter("week");
        this.createTimeRangeFilter("month");
        this._time_range_elmts.querySelector("#day-range").checked = true;
        this._filters_elmt.appendChild(this._time_range_elmts)
        this._time_range_elmts = this._time_range_elmts.querySelectorAll("input[name=time-range]");
    }
    private createTimeRangeFilter(range: string) {
        var radio = document.createElement("input");
        var label = document.createElement("label")
        radio.type = "radio";
        radio.name = "time-range";
        radio.id = range + "-range";
        label.setAttribute("for", range + "-range");
        label.innerHTML = range;
        this._time_range_elmts.appendChild(radio);
        this._time_range_elmts.appendChild(label);
    }
    private createPriorityElmt() {
        var elmt = document.createElement("div");
        elmt.classList.add("priority");
        elmt.innerHTML = "☆" + " high priority : deactivated";
        elmt.addEventListener("click", () => {
            priorityListener(elmt);
            elmt.innerHTML += elmt.innerHTML.includes("☆") ? " high priority : deactivated" : " high priority : activated"
            this._task_list_view.update();
        });
        this._priority_btn_elmt = elmt;
        this._filters_elmt.appendChild(elmt);
    }
    private createStrictnessElmt() {
        var elmt = document.createElement("div");
        var checkbox = document.createElement("input");
        var label = document.createElement("label")
        checkbox.type = "checkbox";
        checkbox.name = "strictness";
        checkbox.id = "strictness";
        elmt.id = "tag-strictness-filter";
        label.setAttribute("for", "strictness");
        label.innerHTML = "Tag search : or"
        checkbox.addEventListener("change", () => {
            if (label.innerHTML.includes("or")) label.innerHTML = label.innerHTML.replace("or", "and");
            else label.innerHTML = label.innerHTML.replace("and", "or");
            this._task_list_view.update();
        })
        elmt.appendChild(checkbox);
        elmt.appendChild(label);
        this._filters_elmt.appendChild(elmt);
        this._strictness_btn_elmt = checkbox;
    }
    private createTagInputElmt() {
        var elmt = document.createElement("input");
        elmt.id = "tag-input-filter";
        elmt.placeholder = "Tag";
        elmt.type = "text";
        elmt.addEventListener("input", () => {

        })
        this._tag_input_elmt = elmt;
        this._filters_elmt.appendChild(elmt);
    }
    private createTagListElmt() {
        var elmt = document.createElement("div");
        var list = document.createElement("div");
        elmt.id = "tag-list-container";
        list.id = "tag-list-filter";
        elmt.appendChild(list);
        this._tag_list_elmt = list;
        this._filters_elmt.appendChild(elmt);
    }

    public set task_list_view(v: TaskListView) {
        this._task_list_view = v;
    }

    public updateThemes(taskArray: Task[]) {
        taskArray.forEach(task => {
            task.tags.forEach(theme => {
                if (this._themes.indexOf(theme) == -1) {
                    this._themes.push(theme);
                    var tag_view = new TagViewCheckable(theme);
                    this.addTagViewCheckListener(tag_view);
                    this._tag_list_elmt.appendChild(tag_view.elmt);
                }
            })
        })
    }

    private addTagViewCheckListener(tag_view: TagViewCheckable) {
        tag_view.checkbox.addEventListener("change", () => {
            var text: string = tag_view.checkbox.parentElement.querySelector('.theme-text').innerHTML;
            if (this._themes_checked.indexOf(text) == -1 && tag_view.checkbox.checked) this._themes_checked.push(text);
            else this._themes_checked.splice(this._themes_checked.indexOf(text), 1);
            this._task_list_view.update();
        })
    }

    private inputThemeEventListener() {
        this._tag_input_elmt.addEventListener('input', () => {
            var length: number = this._tag_list_elmt.children.length;
            for (let i = 0; i < length; i++) {
                var child = this._tag_list_elmt.children.item(i);
                var theme_text = this._tag_list_elmt.children.item(i).querySelector(".theme-text");
                if (theme_text.innerHTML.toLowerCase().indexOf(this._tag_input_elmt.value) == -1) child.classList.add("theme-invisible");
                else child.classList.remove("theme-invisible");
            }
        })
    }

    private addTimeRangeEventListener() {
        for (const timeSelector of this._time_range_elmts) {
            timeSelector.addEventListener("change", () => {
                this._task_list_view.update();
            })
        }
    }

    private addThemeStrictnessListener() {
        this._strictness_btn_elmt.addEventListener("change", () => {
            this._task_list_view.update();
        })
    }

    public getTimeRange(): number {
        var i: number = 0;
        for (const timeSelector of this._time_range_elmts) {
            if (timeSelector.checked) return i;
            i++;
        }
        return -1;
    }

    public getPriorityActive(): boolean {
        return this._priority_btn_elmt.innerHTML == "★ high-priority : activated" ? true : false;
    }

    public get themes(): string[] {
        return this._themes_checked;
    }

    public isThemeStrict(): boolean {
        return this._strictness_btn_elmt.checked;
    }

}