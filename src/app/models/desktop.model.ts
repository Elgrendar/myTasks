import { Project } from './project.model';
import { User } from './user.model';

export class Desktop {
  private id_desktop: number;
  private title: string;
  private description: string;
  private owner_name: string;
  private collaborators: Array<User>;
  private projects: Array<Project>;
  private color: string;

  constructor(id_desktop: number, title: string,description: string, owner: User) {
    this.id_desktop = id_desktop;
    this.title = title;
    this.description = description;
    this.owner_name = owner.user_name;
    this.collaborators = [];
    this.projects = [];
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    this.color = 'RGB(' + r + ',' + g + ',' + b + ')';
  }

  //SETTERS

  setIdDesktop(id_desktop: number) {
    this.id_desktop = id_desktop;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string){
    this.description= description;
  }

  //GETTERS

  getIdDesktop() {
    return this.id_desktop;
  }

  getOwnerName() {
    return this.owner_name;
  }

  getTitle() {
    return this.title;
  }

  getDescription(){
    return this.description;
  }

  //METHODS

  addProject(project: Project) {
    this.projects.push(project);
  }

  addCollaborator(user: User) {
    this.collaborators.push(user);
  }

  deleteProject(id_project: number) {}

  deleteCollaborator(id_user: number) {}

  changeOwnerName(owner_name: string) {
    this.owner_name = owner_name;
  }
}
