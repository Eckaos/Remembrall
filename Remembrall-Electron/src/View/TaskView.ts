import { AgendaTask, Task } from "../model/Task";
import { createDeleteElmt, priorityListener } from "../Utils/FunctionUtils";
import { AgendaTaskListView, TaskListView } from "./TaskListView";

export class TaskView {

    private _elmt: Element;

    constructor(task_list_view: TaskListView, task: Task) {
        this._elmt = document.createElement("details");
        this._elmt.appendChild(this.createHeader(task_list_view, task));
        this.elmt.appendChild(this.createDescription(task.description));
        this._elmt.classList.add("task");
    }
    private createHeader(task_list_view: TaskListView, task: Task): Element {
        var elmt = document.createElement('summary');
        elmt.appendChild(this.createPriorityValueElmt(task.priority));
        elmt.appendChild(this.createTitleElmt(task.title));
        var delete_elmt = createDeleteElmt(this._elmt);
        delete_elmt.addEventListener('click', (event) => {
            event.preventDefault();
            elmt.parentElement.remove();
            task_list_view.removeTask(task);
        })
        elmt.appendChild(delete_elmt);
        elmt.classList.add("task-header");
        return elmt;
    }
    private createPriorityValueElmt(priority: boolean): Element {
        var elmt = document.createElement("div");
        elmt.classList.add("priority");
        elmt.innerHTML = priority ? "★" : "☆";
        elmt.addEventListener("click", () => {
            priorityListener(elmt);
        })
        return elmt;
    }
    private createTitleElmt(title: string): Element {
        var elmt = document.createElement("div");
        elmt.innerHTML = title;
        elmt.classList.add("task-title");
        return elmt;
    }
    private createDescription(description: string): Element {
        var elmt = document.createElement("div");
        elmt.innerHTML = description;
        elmt.classList.add("task-description");
        return elmt;
    }

    public get elmt(): Element {
        return this._elmt;
    }
}