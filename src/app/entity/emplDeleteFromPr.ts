export class EmplDeleteFromPr {

  projectId: string;
  employeeId: string;

  constructor(projectId: string, employeeId: string) {
    this.projectId = projectId;
    this.employeeId = employeeId;
  }
}
