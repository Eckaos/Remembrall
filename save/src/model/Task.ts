export class Task {
    public date: Date;
    public description: string;
    public priority: boolean;
    public tags: string[];
    public title: string;

    constructor(date: Date, title: string, description: string, priority: boolean, tags: string[]) {
        this.date = date;
        this.description = description;
        this.priority = priority;
        this.tags = tags;
        this.title = title;
    }
}