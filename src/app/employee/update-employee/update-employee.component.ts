import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EmployeeServices} from '../../services/employee.services';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {EmployeeforUpdate} from '../../entity/employeeforupdate';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit, OnDestroy {

  public employeeForm: FormGroup;
  updateEmployeeSubscription: Subscription;
  message: string;
  employeeId;

  constructor(private route: ActivatedRoute, private employeeServices: EmployeeServices) {
    this.employeeForm = new FormGroup({
      nameFormControl:
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      surnameFormControl:
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      ageFormControl:
        new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ]),
      citizenFormControl:
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      phoneFormControl:
        new FormControl('', [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(12),
          Validators.maxLength(20),
        ])
    });
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    console.log(this.employeeId);
  }

  public updateeEmployee = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeCreation(employeeFormValue);
    }
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  private executeEmployeeCreation = (employeeFormValue) => {
    const employe = new EmployeeforUpdate(this.employeeId, employeeFormValue.nameFormControl, employeeFormValue.surnameFormControl,
      employeeFormValue.ageFormControl, employeeFormValue.citizenFormControl, employeeFormValue.phoneFormControl);
    this.updateEmployeeSubscription = this.employeeServices.updateEmployee(employe).subscribe((response: HttpResponse<any>) => {
      },
      (errorResponse: HttpErrorResponse) => {
        this.message = 'Employee has not been updated';
        console.log(errorResponse);
      },
      () => {
        this.message = 'Employee has been  updated';
      }
    );
  };

  ngOnDestroy(): void {
    if (this.updateEmployeeSubscription !== undefined) {
      this.updateEmployeeSubscription.unsubscribe();
    }
  }

}
