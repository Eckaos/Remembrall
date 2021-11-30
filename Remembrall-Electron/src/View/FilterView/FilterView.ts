import { AgendaTask } from "../../model/Task";
import { priorityListener } from "../../Utils/FunctionUtils";
import { TagViewCheckable } from "../TagView";
import { AgendaTaskListView } from "../TaskListView";
import { SearchListView } from "./SearchListView";
import { RadioGroupView } from "./RadioGroupView";
import { SuggestionInput } from "./SuggestionInput";

export class FilterView {

    private _filters_elmt: Element;

    private _time_range_view: RadioGroupView;
    private _priority_btn_elmt: Element;

    private _tags: string[];
    private _tags_checked: string[];

    private _task_list_view: AgendaTaskListView;
    private _title_input_view: SuggestionInput;

    private _tag_filter_view: SearchListView;


    //TODO add elmt from TagFilterView and from TimeRangeFilterView and from TitleInputFilter View to filter elmt
    //TODO add listener for TagFilterView and TimeRangeFilterView and TitleInputFilterView
    //TODO faire en sorte que ca fonctionne
    constructor(filters_elmt: Element) {
        this._filters_elmt = filters_elmt;
        this.makeView();
        this._tags = [];
        this._tags_checked = [];
    }
    private makeView() {
        this._filters_elmt.innerHTML = "Filters";
        this.createTitleFilterView();
        this.createTimeRangeView();
        this.createPriorityElmt();
        this.createTagFilterView();
    }

    private createTitleFilterView() {
        this._title_input_view = new SuggestionInput("task-title-filter");
        this._filters_elmt.appendChild(this._title_input_view.input_elmt);
        this._filters_elmt.appendChild(this._title_input_view.suggestions_elmt);
        this._title_input_view.input_elmt.addEventListener("input", () => {
            this._task_list_view.update();
        })
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

    public set task_list_view(v: AgendaTaskListView) {
        this._task_list_view = v;
    }

    public update(taskArray: AgendaTask[]) {
        this._title_input_view.suggestions_elmt.innerHTML = "";
        taskArray.forEach(task => {
            task.tags.forEach(tag => {
                if (this._tags.indexOf(tag) == -1) {
                    this._tags.push(tag);
                    var tag_view = new TagViewCheckable(tag);
                    this.addTagViewCheckListener(tag_view);
                    this._tag_filter_view.addSearchListItem(tag_view);
                }
            })
            this._title_input_view.addSuggestion(task.title);
        })
    }


    private createTagFilterView() {
        this._tag_filter_view = new SearchListView("tag-filter");
        this._filters_elmt.appendChild(this._tag_filter_view.container_elmt);
    }

    private addTagViewCheckListener(tag_view: TagViewCheckable) {
        tag_view.checkbox.addEventListener("change", () => {
            var text: string = tag_view.text;
            if (this._tags_checked.indexOf(text) == -1 && tag_view.checkbox.checked) this._tags_checked.push(text);
            else this._tags_checked.splice(this._tags_checked.indexOf(text), 1);
            this._task_list_view.update();
        })
    }

    private createTimeRangeView() {
        this._time_range_view = new RadioGroupView("time-range", ["day", "week", "month"]);
        this.addTimeRangeEventListener();
        this._filters_elmt.appendChild(this._time_range_view.radio_elmts);
    }
    private addTimeRangeEventListener() {
        for (const timeSelector of this._time_range_view.radio_elmts.querySelectorAll("input[name=time-range]")) {
            timeSelector.addEventListener("change", () => {
                this._task_list_view.update();
            })
        }
    }

    public getTimeRange(): number {
        return this._time_range_view.getCheckedRadio();
    }

    public getPriorityActive(): boolean {
        return this._priority_btn_elmt.innerHTML.includes("★");
    }

    public get tags(): string[] {
        return this._tags_checked;
    }

    public nameFilter(): string {
        return this._title_input_view.input_elmt.value;
    }
}