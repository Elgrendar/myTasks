import { User } from "./user.model";

export class Task{
    private id_task:number = 0;
    private description_task: string | undefined;
    private author_task: User | undefined;

    constructor(id_task: number, description_task: string, author_task: User){
        this.id_task= id_task;
        this.description_task= description_task;
        this.author_task = author_task
    }

    //SETTERS 
    /** Devolvemos el id de la tarea */
    getIdTask(){
        return this.id_task;
    }
    /**Devolvemos la descripción de la tarea */
    getDescriptionTask(){
        return this.description_task;
    }
    /**Obtenemos el autor de la tarea */
    getAuthor(){
        return this.author_task;
    }

    //GETTERS
    /** Establecemos el id de la tarea*/
    setIdTask(id_task:number){
        this.id_task= id_task;
    }
    /** Establecemos la descripción de la tarea */
    setDescriptionTask(description_task: string){
        this.description_task=description_task;
    }
    /**Establecemos el autor de la tarea */
    setAuthorTask(author_task: User){
        this.author_task=author_task;
    }
}