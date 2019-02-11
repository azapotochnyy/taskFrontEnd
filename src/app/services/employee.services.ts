import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Employeeforsave} from '../entity/employeeforsave';
import {Observable} from 'rxjs';
import {Employeereceived} from '../entity/employeereceived';
import {EmployeeforUpdate} from '../entity/employeeforupdate';

@Injectable()
export class EmployeeServices {


  constructor(private http: HttpClient) {
  }

  getAllEmployeesRequest() {
    return this.http.get('http://localhost:8080/api/employees', {
      headers: {
        'Content-Type': 'Application/json'
      }
    });
  }

  getAndMapEmployeeData(employeeData: Employeereceived[]) {
    const employee = [];
    for (let i = 0; i < employeeData.length; i++) {
      const saveEmployee = new Employeereceived(employeeData[i].employeeId, employeeData[i].name, employeeData[i].surname,
        employeeData[i].age, employeeData[i].cityzen, employeeData[i].phone);
      employee.push(saveEmployee);
    }
    return employee;
  }

  saveEmployee(employeForSave: Employeeforsave): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('POST', 'http://localhost:8080/api/employees', employeForSave
      , HttpUploadOptions);
    return this.http.request(req);
  }


  deleteEmployee(employeIdToDelet: number): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('DELETE', 'http://localhost:8080/api/employees/' + employeIdToDelet
      , HttpUploadOptions);
    return this.http.request(req);
  }


  updateEmployee (employeForUpdate: EmployeeforUpdate): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('PUT', 'http://localhost:8080/api/employees', employeForUpdate
      , HttpUploadOptions);
    return this.http.request(req);
  }
}


