import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Employeereceived} from '../../entity/employeereceived';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {EmployeeServices} from '../../services/employee.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-getall-employees',
  templateUrl: './getall-employees.component.html',
  styleUrls: ['./getall-employees.component.css']
})
export class GetallEmployeesComponent implements OnInit, OnDestroy, OnChanges {

  @Input() index;
  displayedColumns: string[] = ['employeeid', 'name', 'surname', 'age', 'cityzen', 'phone', 'update', 'delete'];
  dataSource: Employeereceived[] = [];
  subscriber: Subscription;
  deleteEmployeeSubscription: Subscription;

  constructor(private services: EmployeeServices, private router: Router) {
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.subscriber = this.services.getAllEmployeesRequest().subscribe(
      (employeeData: Employeereceived[]) => {
        this.dataSource = this.services.getAndMapEmployeeData(employeeData);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      });
  }

  public redirectToUpdate = (id: string) => {
    console.log(id);
    this.router.navigate(['/employees/', id]);
  };

  public redirectToDelete = (id: string) => {
    const deleteEmployeeId = +id;
    this.deleteEmployeeSubscription = this.services.deleteEmployee(deleteEmployeeId).subscribe((response: HttpResponse<any>) => {
        console.log(response);
        this.getAllEmployees();
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      },
      () => {
      }
    );
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && this.index === 0) {
      this.subscriber = this.services.getAllEmployeesRequest().subscribe(
        (employeeData: Employeereceived[]) => {
          this.dataSource = this.services.getAndMapEmployeeData(employeeData);
          this.getAllEmployees();
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        });
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}




