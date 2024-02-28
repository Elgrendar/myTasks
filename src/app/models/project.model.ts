import { Task } from "./task.model";
import { User } from "./user.model";

export interface Project{

    projectId: number;
    projectTitle: string;
    projectAuthor: User | undefined;
    projectDescription: string | undefined;
    projectTasks: Task[];
}