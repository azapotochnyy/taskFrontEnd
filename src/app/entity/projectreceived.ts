
export class Projectreceived {

  projectId: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;

  constructor(projectId?: number, name?: string, startDate?: string, endDate?: string, description?: string) {
    this.projectId = projectId;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
