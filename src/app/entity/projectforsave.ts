
export class Projectforsave {

  name: string;
  startDate: string;
  endDate: string;
  description: string;

  constructor( name?: string, startDate?: string, endDate?: string, description?: string) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
