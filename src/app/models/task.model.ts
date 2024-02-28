import { User } from "./user.model";

export interface Task{
    taskId: number;
    taskCompleted: boolean;
    taskTitle: string;
    taskDescription: string;
    taskCreationDate: Date;
    taskExpirationDate: Date;
    taskFinishDate: Date;
    taskOwner: User;
    taskEnded: boolean;
    taskCollaborators:User[];
}