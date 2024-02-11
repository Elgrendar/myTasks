export class Task{
    private id_task:number = 0;
    private description_task: string | undefined;
    private author_task: string | undefined;

    constructor(id_task: number, description_task: string, author_task: string){
        this.id_task= id_task;
        this.description_task= description_task;
        this.author_task = author_task
    }

    //SETTERS 

    getIdTask(){
        return this.id_task;
    }
    getDescriptionTask(){
        return this.description_task;
    }
    getAuthor(){
        return this.author_task;
    }

    //GETTERS

    setIdTask(id_task:number){
        this.id_task= id_task;
    }
    setDescriptionTask(description_task: string){
        this.description_task=description_task;
    }
    setAuthorTask(author_task: string){
        this.author_task=author_task;
    }
}