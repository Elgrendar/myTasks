import { Task } from "./task.model";
export class Project{

    private id_project: number =0;
    private title_project: string ="Title";
    private author_project: string |undefined;
    private description_project: string | undefined;
    private project_tasks: Array<number>;

    constructor(
        id_project: number,
        title_project: string,
        author_project:string,
        description_project:string
    ){
        this.id_project = id_project;
        this.title_project = title_project;
        this.author_project = author_project;
        this.description_project = description_project;
        this.project_tasks = [];
    }

    //SETTERS

    setIdProject(id_project: number){
        this.id_project=id_project;
    }

    setTitleProject(title_project: string){
        this.title_project = title_project;
    }

    setAuthorProject(author_project: string){
        this.author_project= author_project;
    }

    setDescriptionProject(description_project: string){
        this.description_project = description_project;
    }


    //GETTERS

    getIdProject(){
        return this.id_project;
    }

    getTitleProject(){
        return this.title_project;
    }

    getAuthorProject(){
        return this.author_project;
    }

    getDescriptionProject(){
        return this.description_project;
    }
    getProjectTask(){
        return this.project_tasks;
    }

    //Methods

    addTask(task: Task){
        this.project_tasks.push(task.getIdTask());
    }
}