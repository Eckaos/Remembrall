import { Task } from "../model/Task";
import * as fs from "fs"
export * as fs from "fs"

export var jsonDir = "./json/tasks/";
export var jsonDirWindows = ".\\json\\tasks\\";

export function getTaskPath(file): string {
    var finalPath = jsonDir + file;
    if (process.platform === "win32") finalPath = jsonDirWindows + file;
    return finalPath;
}