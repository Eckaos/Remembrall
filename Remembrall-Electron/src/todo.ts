import { todo_tasks_list_elmt, todo_title_elmt } from "./Utils/HtmlElements";
import { ToDoTaskListView } from "./View/TaskListView";
import { AgendaTaskMakerView } from "./View/TaskMakerView";




var task_list_view = new ToDoTaskListView(todo_tasks_list_elmt, todo_title_elmt);
var task_maker_view = new AgendaTaskMakerView();