export interface Project {
    projectId: number,
    projectTitle: string,
    projectDescription: string,
    projectOwnerId: number,
    projectDesktopId: number,
    projectCollaboratorId: [number],
    projectActive: boolean
}