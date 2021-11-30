import { fs } from "../Utils/JSONUtils";

export class Task {
    public description: string;
    public priority: boolean;
    public tags: string[];
    public title: string;

    constructor(title: string, description: string, priority: boolean, tags: string[]) {
        this.description = description;
        this.priority = priority;
        this.tags = tags;
        this.title = title;
    }

    public static toJson(taskArray: Task[], path: string) {
        var tasksJson = JSON.stringify(taskArray, null, 4);
        fs.writeFileSync(path, tasksJson);
    }

    public static fromJson(path: string): Task[] {
        var tasksJson = fs.readFileSync(path).toString();
        if (tasksJson.length > 0) {
            return JSON.parse(tasksJson);
        }
        return [];
    }
}

export class AgendaTask extends Task {
    public date: Date;

    constructor(date: Date, title: string, description: string, priority: boolean, tags: string[]) {
        super(title, description, priority, tags);
        this.date = date;
    }

    public static toJson(taskArray: AgendaTask[], path: string) {
        var tasksJson = JSON.stringify(taskArray, null, 4);
        fs.writeFileSync(path, tasksJson);
    }

    public static fromJson(path: string): AgendaTask[] {
        var tasksJson = fs.readFileSync(path).toString();
        if (tasksJson.length > 0) {
            return JSON.parse(tasksJson);
        }
        return [];
    }
}