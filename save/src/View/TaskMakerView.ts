import { Calendar } from "../model/Calendar";
import { Task } from "../model/Task";
import { transformDateToFileName } from "../Utils/DateUtils";
import { priorityListener } from "../Utils/FunctionUtils";
import { getTaskPath, toJson } from "../Utils/JSONUtils";
import { TagView } from "./TagView";
import { TaskListView } from "./TaskListView";

export class TaskMakerView {
    private _description_input_elmt;
    private _priority_value_elmt: Element;
    private _tag_input_elmt;
    private _tag_list_elmt: Element;
    private _add_task_btn_elmt: Element;
    private _calendar: Calendar;
    private _tags: string[];
    private _task_list_view: TaskListView;
    private _task_maker_elmt: Element;
    private _title_input_elmt;

    constructor(calendar: Calendar, task_maker_elmt: Element) {
        this._calendar = calendar;
        this._task_maker_elmt = task_maker_elmt;
        this.makeView();
        this._tags = [];
        this._description_input_elmt.style.height = this._description_input_elmt.scrollHeight + "px";
        this.addTaskEventListener();
        this.addDescriptionEventListener();
        this.addPriorityEventListener();
        this.addThemeEventListener();
    }

    public set task_list_view(value: TaskListView) {
        this._task_list_view = value;
    }

    private addThemeEventListener() {
        this._tag_input_elmt.addEventListener('input', () => {
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
    }

    private addPriorityEventListener() {
        this._priority_value_elmt.addEventListener("click", () => {
            priorityListener(this._priority_value_elmt);
        });
    }

    private addDescriptionEventListener() {
        this._description_input_elmt.addEventListener("input", () => {
            this._description_input_elmt.style.height = "0px"
            this._description_input_elmt.style.height = this._description_input_elmt.scrollHeight + "px";
        })
        this._description_input_elmt.addEventListener("keydown", (event) => {
            if (event.shiftKey == false && event.code === "Enter") {
                event.preventDefault();
                if (this._description_input_elmt.value != "") {
                    this.createTask();
                    this._description_input_elmt.style.height = "0px"
                    this._description_input_elmt.style.height = this._description_input_elmt.scrollHeight + "px";
                }
            }
        })
        document.addEventListener("keydown", (event) => {
            if (this._description_input_elmt != document.activeElement && event.shiftKey == false && event.code == "Enter" && this._description_input_elmt.value != "") {
                this.createTask()
            }
        })
    }

    private addTaskEventListener() {
        this._add_task_btn_elmt.addEventListener('click', () => {
            this.createTask();
        });
    }


    private createTask() {
        var task: Task = new Task(this._calendar.selected_day, this._title_input_elmt.value, this._description_input_elmt.value, this._priority_value_elmt.innerHTML == "☆" ? false : true, this._tags);
        var file: string = transformDateToFileName(this._calendar.selected_day) + ".json";
        toJson(this._task_list_view.taskArray.concat(task), getTaskPath(file));
        this._description_input_elmt.value = "";
        this._task_list_view.update();
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
        return elmt;
    }

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
        return elmt;
    }
    private createTagInputElmt() {
        var elmt = document.createElement("input");
        elmt.id = "tag-input";
        elmt.placeholder = "Tag";
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
        return elmt;
    }
}