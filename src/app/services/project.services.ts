import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Projectforsave} from '../entity/projectforsave';
import {EmplAddProject} from '../entity/emplAddProject';
import {Projectreceived} from '../entity/projectreceived';
import {EmployeeforUpdate} from '../entity/employeeforupdate';
import {Projectforupdate} from '../entity/projectforupdate';

@Injectable()
export class ProjectServices {

  constructor(private http: HttpClient) {
  }

  getAllProjectsRequest() {
    return this.http.get('http://localhost:8080/api/projects', {
      headers: {
        'Content-Type': 'Application/json'
      }
    });
  }
  getAndMapProjectData(projectData: Projectreceived[]) {
    const project = [];
    for (let i = 0; i < projectData.length; i++) {
      const saveProject = new Projectreceived(projectData[i].projectId, projectData[i].name,
        projectData[i].startDate, projectData[i].endDate, projectData[i].description);
      project.push(saveProject);
    }
    return project;
  }

  saveProject(projectForSave: Projectforsave): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('POST', 'http://localhost:8080/api/projects', projectForSave
      , HttpUploadOptions);
    return this.http.request(req);
  }

  getListOfEmployeesOnProject(projectId: number) {
    return this.http.get('http://localhost:8080/api/projects/' + projectId + '/list', {
      headers: {
        'Content-Type': 'Application/json'
      }
    });
  }

  addEmployeeToProject(employeEadd: EmplAddProject): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('PUT', 'http://localhost:8080/api/projects/list', employeEadd
      , HttpUploadOptions);
    return this.http.request(req);
  }

  deleteEmployeeFromTheProject(employeEadd: EmplAddProject): Observable<any> {
    console.log('ELETE');
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('DELETE', 'http://localhost:8080/api/projects/list', employeEadd
      , HttpUploadOptions);
    return this.http.request(req);
  }

  deleteProject(projectIdtoDelet: number): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('DELETE', 'http://localhost:8080/api/projects/' + projectIdtoDelet
      , HttpUploadOptions);
    return this.http.request(req);
  }

  updateProject (projectForUpdate: Projectforupdate): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      }),
    };
    const req = new HttpRequest('PUT', 'http://localhost:8080/api/employees', projectForUpdate
      , HttpUploadOptions);
    return this.http.request(req);
  }

}







