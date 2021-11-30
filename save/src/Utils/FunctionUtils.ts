export function priorityListener(elmt: Element) {
    if (elmt.innerHTML.charAt(0) == "★") elmt.innerHTML = "☆";
    else elmt.innerHTML = "★";
}

export function createDeleteElmt(parentElement: Element): Element {
    var elmt = document.createElement("div");
    elmt.innerHTML = "&times;";
    elmt.classList.add("delete-btn");
    elmt.addEventListener("click", () => {
        parentElement.remove();
    });
    return elmt;
}