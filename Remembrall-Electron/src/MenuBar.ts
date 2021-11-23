import * as $ from "jquery";
import { ButtonPage } from "./model/ButtonPage";

var header = document.getElementsByTagName('head')[0];
var selectedIndex: number = 0;



var weekBtnPage: ButtonPage = new ButtonPage("agenda", document.querySelector('#agenda-btn'));
var todoAssociated: ButtonPage = new ButtonPage("todo", document.querySelector('#todo-btn'));
var associated: ButtonPage[] = [weekBtnPage, todoAssociated];

weekBtnPage.getButton.classList.add('selected');
for (let index = 0; index < associated.length; index++) {
    $.ajaxSetup({ async: false });
    $.get(__dirname + "/../html_element/" + associated[index].getName + ".html", '', function (data) { $("#content").append(data) });
    associated[index].setContent = document.querySelector("#" + associated[index].getName);
    $.ajaxSetup({ async: true });
    if (index != selectedIndex) {
        associated[index].getContent.style.display = 'none';
    }
    menuBtnListener(associated, index);
}

function menuBtnListener(array: ButtonPage[], index: number) {
    array[index].getButton.addEventListener("click", () => {
        if (array[index].getButton.classList.contains('selected')) {
            return;
        }
        array[selectedIndex].getButton.classList.remove('selected');
        array[selectedIndex].getContent.style.display = 'none';
        array[index].getContent.style.display = '';
        array[index].getButton.classList.add('selected');
        selectedIndex = index;
    })

}
/* rename file for menu bar or start app */