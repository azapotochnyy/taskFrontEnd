export class Employeereceived {

  employeeId: number;
  name: string;
  surname: string;
  age: string;
  cityzen: string;
  phone: string;

  constructor(employeeId?: number, name?: string, surname?: string, age?: string, cityzen?: string, phone?: string) {
    this.employeeId = employeeId;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.cityzen = cityzen;
    this.phone = phone;
  }
}
