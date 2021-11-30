import { Calendar } from "../model/Calendar";
import { AgendaTask, Task } from "../model/Task";
import { monthsName, transformDateToFileName } from "../Utils/DateUtils";
import { priorityListener } from "../Utils/FunctionUtils";
import { getTaskPath } from "../Utils/JSONUtils";
import { TagView } from "./TagView";
import { AgendaTaskListView, TaskListView, ToDoTaskListView } from "./TaskListView";


export abstract class TaskMakerView {
    protected _description_input_elmt;
    protected _priority_value_elmt: Element;
    private _tag_input_elmt;
    private _tag_list_elmt: Element;
    private _add_task_btn_elmt: Element;
    protected _tags: string[];
    private _task_maker_elmt: Element;
    protected _title_input_elmt;

    constructor(task_maker_elmt: Element) {
        this._task_maker_elmt = task_maker_elmt;
        this._tags = [];
        this.makeView();
        this.documentListener();
    }

    public abstract set task_list_view(value: TaskListView);

    private documentListener() {
        document.addEventListener("keydown", (event) => {
            if (this._description_input_elmt != document.activeElement && event.shiftKey == false && event.code == "Enter" && this._description_input_elmt.value != "" && this._title_input_elmt.value != "") {
                this.createTask()
            }
        })
    }

    private makeView() {
        this._add_task_btn_elmt = this.createAddTaskBtnElmt();
        this._priority_value_elmt = this.createPriorityValueElmt();
        this._tag_input_elmt = this.createTagInputElmt();
        this._tag_list_elmt = this.createTagListElmt();
        this._description_input_elmt = this.createDescriptionInput();
        this._title_input_elmt = this.createTitleInputElmt();
        this.appendAllElmts();
    }

    private appendAllElmts() {
        this._task_maker_elmt.appendChild(this._priority_value_elmt);
        this._task_maker_elmt.appendChild(this._title_input_elmt);
        this._task_maker_elmt.appendChild(this._description_input_elmt);
        this._task_maker_elmt.appendChild(this._tag_input_elmt);
        this._task_maker_elmt.appendChild(this._tag_list_elmt);
        this._task_maker_elmt.appendChild(this._add_task_btn_elmt);
    }

    private createAddTaskBtnElmt(): Element {
        var elmt = document.createElement("div");
        elmt.id = "add-task-btn";
        elmt.innerHTML = "+"
        elmt.addEventListener('click', () => {
            this.createTask();
        });
        return elmt;
    }

    protected abstract createTask();

    private createTitleInputElmt(): Element {
        var elmt = document.createElement("input");
        elmt.id = "title-input";
        elmt.placeholder = "Task Title";
        return elmt;
    }

    private createPriorityValueElmt(): Element {
        var elmt = document.createElement("div");
        elmt.id = "priority-value";
        elmt.classList.add("priority");
        elmt.innerHTML = "☆";
        elmt.addEventListener("click", () => {
            priorityListener(this._priority_value_elmt);
        })
        return elmt;
    }
    private createTagInputElmt() {
        var elmt = document.createElement("input");
        elmt.id = "tag-input";
        elmt.placeholder = "Tag";
        elmt.addEventListener('input', () => {
            const regex = new RegExp("^[a-zA-Z1-9]+,$");
            const regex2 = new RegExp("^,$");
            if (regex.test(this._tag_input_elmt.value) && this._tag_input_elmt.value.indexOf(",") != -1) {
                this._tag_list_elmt.appendChild(new TagView(this._tag_input_elmt.value.replace(",", "")).elmt)
                this._tags.push(this._tag_input_elmt.value.replace(",", ""));
                this._tag_input_elmt.value = "";
            } else if (regex2.test(this._tag_input_elmt.value)) {
                this._tag_input_elmt.value = "";
            }
        })
        return elmt;
    }
    private createTagListElmt(): Element {
        var elmt = document.createElement("div");
        elmt.id = "added-tag-list";
        return elmt;
    }
    private createDescriptionInput() {
        var elmt = document.createElement("textarea");
        elmt.id = "description-input";
        elmt.placeholder = "Task description"
        elmt.addEventListener("input", () => {
            this._description_input_elmt.style.height = "0px"
            this._description_input_elmt.style.height = this._description_input_elmt.scrollHeight + "px";
        })
        elmt.addEventListener("keydown", (event) => {
            if (event.shiftKey == false && event.code === "Enter") {
                event.preventDefault();
            }
        })
        return elmt;
    }
}

export class TodoTaskMakerView extends TaskMakerView {

    private _task_list_view: ToDoTaskListView;

    constructor(task_maker_elmt: Element) {
        super(task_maker_elmt);
    }

    public override set task_list_view(value: ToDoTaskListView) {
        this._task_list_view = value;
    }

    protected createTask() {
        var task: Task = new Task(this._title_input_elmt.value, this._description_input_elmt.value, this._priority_value_elmt.innerHTML == "☆" ? false : true, this._tags);
        var file: string = this._task_list_view.title_elmt.innerHTML + ".json";
        Task.toJson(this._task_list_view.taskArray.concat(task), getTaskPath(file));
        this._description_input_elmt.value = "";
        this._task_list_view.update();
    }

}

export class AgendaTaskMakerView extends TaskMakerView {

    private _task_list_view: AgendaTaskListView;
    private _calendar: Calendar;

    constructor(calendar: Calendar, task_maker_elmt: Element) {
        super(task_maker_elmt);
        this._calendar = calendar;
    }

    public override set task_list_view(value: AgendaTaskListView) {
        this._task_list_view = value;
    }

    protected override createTask() {
        var task: AgendaTask = new AgendaTask(this._calendar.selected_day, this._title_input_elmt.value, this._description_input_elmt.value, this._priority_value_elmt.innerHTML == "☆" ? false : true, this._tags);
        var file: string = transformDateToFileName(this._calendar.selected_day) + ".json";
        AgendaTask.toJson(this._task_list_view.taskArray.concat(task), getTaskPath(file));
        this._description_input_elmt.value = "";
        this._task_list_view.update();
    }
}