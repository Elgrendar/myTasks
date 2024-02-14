import { Task } from "./task.model";
import { User } from "./user.model";
export class Project{

    private id_project: number =0;
    private title_project: string ="Title";
    private author_project: User |undefined;
    private description_project: string | undefined;
    private project_tasks: Array<Task>;

    constructor(
        id_project: number,
        title_project: string,
        author_project:User,
        description_project:string
    ){
        this.id_project = id_project;
        this.title_project = title_project;
        this.author_project = author_project;
        this.description_project = description_project;
        this.project_tasks = [];
    }

    //SETTERS
    /**
     * Establecemos el id del proyecto
     * @param id_project id del proyecto
     */
    setIdProject(id_project: number){
        this.id_project=id_project;
    }
    /**
     * Establecemos el título del proyecto sobreescribiendo el existente
     * @param title_project string Titulo del proyecto
     */
    setTitleProject(title_project: string){
        this.title_project = title_project;
    }
    /**
     * Es el autor del proyecto sobreescribiendo el que
     * existier
     * @param author_project User autor del proyecto
     */
    setAuthorProject(author_project: User){
        this.author_project= author_project;
    }
    /**
     * Establecemos la descripción del proyecto sobreescribiendo la que
     * hubiera si existiera
     * @param description_project string descripción del proyecto
     */
    setDescriptionProject(description_project: string){
        this.description_project = description_project;
    }


    //GETTERS

    /**
     * Devuelve el id del proyecto
     * @returns number 
     */
    getIdProject(){
        return this.id_project;
    }
    /**
     * Devuelve el titulo almacenado del proyecto
     * @returns string 
     */
    getTitleProject(){
        return this.title_project;
    }
    /**
     * Devuelve el User autor del proyecto
     * @returns User
     */
    getAuthorProject(){
        return this.author_project;
    }
    /**
     * Devuelve la descripción del proyecto
     * @returns string
     */
    getDescriptionProject(){
        return this.description_project;
    }
    /**
     * Devuelve el array de tareas que componen el proyecto
     * @returns Array<task>
     */
    getProjectTask(){
        return this.project_tasks;
    }

    //Methods
    /**
     * Añade una tarea nueva al proyecto almacenandola en el array
     * @param task representa la tarea a añadir
     */
    addTask(task: Task){
        this.project_tasks.push(task);
    }
}