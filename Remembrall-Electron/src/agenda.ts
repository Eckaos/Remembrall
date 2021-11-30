import { Calendar } from "./model/Calendar";
import { CalendarView } from "./View/CalendarView";
import { AgendaTaskMakerView } from "./View/TaskMakerView";
import * as $ from "jquery";
import { FilterView } from "./View/FilterView/FilterView";
import { AgendaTaskListView } from "./View/TaskListView";
import { calendar_elmt, filters_elmt, agenda_tasks_list_elmt, agenda_task_maker_elmt, agenda_title_elmt } from "./Utils/HtmlElements";


// *_elmt : element du DOM

var calendar: Calendar = new Calendar();
var task_maker_view: AgendaTaskMakerView = new AgendaTaskMakerView(calendar, agenda_task_maker_elmt);
var filter_view: FilterView = new FilterView(filters_elmt);
var calendar_view: CalendarView = new CalendarView(calendar, calendar_elmt);
var task_list_view = new AgendaTaskListView(agenda_tasks_list_elmt, agenda_title_elmt, filter_view, calendar_view, calendar);
task_maker_view.task_list_view = task_list_view;

$(function () {
    task_list_view.update();
})
