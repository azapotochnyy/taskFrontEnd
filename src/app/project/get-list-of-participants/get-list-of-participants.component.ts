import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employeereceived} from '../../entity/employeereceived';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ProjectServices} from '../../services/project.services';
import {ActivatedRoute} from '@angular/router';
import {EmplAddProject} from '../../entity/emplAddProject';
import {EmplDeleteFromPr} from '../../entity/emplDeleteFromPr';
import {EmployeeServices} from '../../services/employee.services';

@Component({
  selector: 'app-get-list-of-participants',
  templateUrl: './get-list-of-participants.component.html',
  styleUrls: ['./get-list-of-participants.component.css']
})
export class GetListOfParticipantsComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['employeeid', 'name', 'surname', 'age', 'cityzen', 'phone', 'delete'];
  dataSource: Employeereceived[] = [];
  employeeslistsName: Employeereceived[] = [];
  subscriber: Subscription;
  employeescriberforListOEmployees: Subscription;
  employeeAddscriberresult: Subscription;
  deleteEmployee: Subscription;
  projectId;
  employeeIdForAdd;
  disabled = true;

  constructor(private employeeService: EmployeeServices, private projectService: ProjectServices, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    console.log(this.projectId);
    this.getListOfEmployeesOntheProject();
    this.getListOfEmployeesForSelect();
  }

  public getListOfEmployeesOntheProject() {
    this.subscriber = this.projectService.getListOfEmployeesOnProject(this.projectId).subscribe(
      (employeeData: Employeereceived[]) => {
        this.dataSource = this.employeeService.getAndMapEmployeeData(employeeData);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      });
  }

  getListOfEmployeesForSelect() {
    this.employeescriberforListOEmployees = this.employeeService.getAllEmployeesRequest().subscribe(
      (employeeData: Employeereceived[]) => {

        this.employeeslistsName = this.employeeService.getAndMapEmployeeData(employeeData);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      });
  }

  addEmployee() {
    const employeEadd = new EmplAddProject(
      this.projectId, this.employeeIdForAdd
    );
    this.employeeAddscriberresult = this.projectService.addEmployeeToProject(employeEadd).subscribe((response: HttpResponse<any>) => {
        this.disabled = true;
        this.getListOfEmployeesOntheProject();
        this.getListOfEmployeesForSelect();
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      },
      () => {
      }
    );
  }

  changeEmployee(event: Event) {
    this.employeeIdForAdd = event;
    this.disabled = false;
  }

  redirectToDelete = (employeeId: string) => {
    const employeDelete = new EmplDeleteFromPr(
      this.projectId, employeeId);
    this.deleteEmployee = this.projectService.deleteEmployeeFromTheProject(employeDelete).subscribe((response: HttpResponse<any>) => {
        this.disabled = true;
        this.getListOfEmployeesOntheProject();
        this.getListOfEmployeesForSelect();
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      },
      () => {
      }
    );
  };

  ngOnDestroy(): void {

    if (this.subscriber !== undefined) {
      this.subscriber.unsubscribe();
    }

    if (this.employeescriberforListOEmployees !== undefined) {
      this.employeescriberforListOEmployees.unsubscribe();
    }

    if (this.employeeAddscriberresult !== undefined) {
      this.employeeAddscriberresult.unsubscribe();
    }
    if (this.deleteEmployee !== undefined) {
      this.deleteEmployee.unsubscribe();
    }
  }

}
