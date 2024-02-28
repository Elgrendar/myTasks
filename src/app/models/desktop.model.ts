import { Project } from './project.model';
import { User } from './user.model';

export interface Desktop {
  desktopId: number;
  desktopTitle: string;
  desktopDescription: string;
  desktopOwner: User;
  desktopCollaborators: User[];
  desktopProjects: Project[];
  desktopColor: string;
}
