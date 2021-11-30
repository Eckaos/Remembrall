import { Task } from "../model/Task";

export var fs = require('fs');

export function toJson(tasks: Task[], path: string) {
    var tasksJson = JSON.stringify(tasks, null, 4);
    fs.writeFileSync(path, tasksJson);
}

export function fromJson(path: string): Task[] {
    var tasksJson = fs.readFileSync(path);
    if (tasksJson.length > 0) {
        return JSON.parse(tasksJson);
    }
    return [];
}

export var jsonDir = "./json/tasks/";
export var jsonDirWindows = ".\\json\\tasks\\";

export function getTaskPath(file): string {
    var finalPath = jsonDir + file;
    if(process.platform === "win32") finalPath = jsonDirWindows + file;
    return finalPath;
}