// Main ToDos module

// ToDo Class
export class ToDo {
    constructor(content){
        this.timestamp = Date.now();
        this.content = content;
        this.completed = false;
    }
}

