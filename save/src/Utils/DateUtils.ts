export function transformDateToFileName(date: Date): string {
    var dd: number = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    var dt = dd + '-' + mm + '-' + yyyy;
    return dt;
}

export function transformFileNameToDate(fileName: string): Date {
    var dateParts = fileName.split('-');
    return new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
}

export function transformDateToFrDate(date: Date): string {
    var dd: number = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    var dt = dd + '/' + mm + '/' + yyyy;
    return dt;
}

export var weekDay: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export var monthsName: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


export function equals(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

export function lesser(d1: Date, d2: Date): boolean {
    return d1.getFullYear() <= d2.getFullYear() && d1.getMonth() <= d2.getMonth() && d1.getDate() < d2.getDate();
}

export function getFirstDayOfWeek(d: Date): Date {
    var day = d.getDay();
    var diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.getFullYear(), d.getMonth(), diff);
}