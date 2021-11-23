import { Calendar } from "./model/Calendar";
import { CalendarView } from "./View/CalendarView";
import { TaskMakerView } from "./View/TaskMakerView";
import * as $ from "jquery";
import { FilterView } from "./View/FilterView";
import { TaskListView } from "./View/TaskListView";
import { calendar_elmt, filters_elmt, tasks_list_elmt, task_maker_elmt, title_elmt } from "./Utils/HtmlElements";


// *_elmt : element du DOM

var calendar: Calendar = new Calendar();
var task_maker_view: TaskMakerView = new TaskMakerView(calendar, task_maker_elmt);
var filter_view: FilterView = new FilterView(filters_elmt);
var calendar_view: CalendarView = new CalendarView(calendar, calendar_elmt);
var task_list_view = new TaskListView(tasks_list_elmt, title_elmt, filter_view, calendar_view, calendar);
task_maker_view.task_list_view = task_list_view;

$(function () {
    task_list_view.update();
})
