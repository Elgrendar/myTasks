import { Project } from './project.model';
import { User } from './user.model';

export class Desktop {
  private id_desktop: number;
  private title: string;
  private description: string;
  private owner: User;
  private collaborators: Array<User>;
  private projects: Array<Project>;
  private color: string;

  constructor(
    id_desktop: number,
    title: string,
    description: string,
    owner: User
  ) {
    this.id_desktop = id_desktop;
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.collaborators = [];
    this.projects = [];
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    this.color = 'RGB(' + r + ',' + g + ',' + b + ')';
  }

  //SETTERS
  /**
   *
   * @param id_desktop
   */
  setIdDesktop(id_desktop: number) {
    this.id_desktop = id_desktop;
  }
  /**
   *
   * @param title
   */
  setTitle(title: string) {
    this.title = title;
  }
  /**
   *
   * @param description
   */
  setDescription(description: string) {
    this.description = description;
  }

  //GETTERS
  /**
   * 
   * @returns number
   */
  getIdDesktop() {
    return this.id_desktop;
  }
  /**
   * 
   * @returns User
   */
  getOwnerName() {
    return this.owner;
  }
  /**
   * 
   * @returns string
   */
  getTitle() {
    return this.title;
  }
  /**
   * 
   * @returns string
   */
  getDescription() {
    return this.description;
  }

  //METHODS
  /**
   * 
   * @param project Project
   */
  addProject(project: Project) {
    this.projects.push(project);
  }
  /**
   * 
   * @param user User
   */
  addCollaborator(user: User) {
    this.collaborators.push(user);
  }
  /**
   * 
   * @param id_project 
   */
  deleteProject(id_project: number) {
    throw console.error(
      'Evento aún no implantado solo definido id: ' + id_project
    );
  }
  /**
   * 
   * @param id_user User
   */
  deleteCollaborator(id_user: User) {
    console.error('Evento aún no implantado solo definido para id: ' + id_user);
  }
  /**
   * 
   * @param owner User
   */
  changeOwnerName(owner: User) {
    this.owner = owner;
  }
}
