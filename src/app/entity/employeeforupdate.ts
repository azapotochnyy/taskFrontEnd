export class EmployeeforUpdate {
  employeeId: string;
  name: string;
  surname: string;
  age: string;
  cityzen: string;
  phone: string;

  constructor(employeeId: string, name?: string, surname?: string, age?: string, cityzen?: string, phone?: string) {
    this.employeeId = employeeId;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.cityzen = cityzen;
    this.phone = phone;
  }
}
