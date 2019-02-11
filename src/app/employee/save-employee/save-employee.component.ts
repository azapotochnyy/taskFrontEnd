import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employeeforsave} from '../../entity/employeeforsave';
import {Subscription} from 'rxjs';
import {EmployeeServices} from '../../services/employee.services';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit, OnDestroy {

  public employeeForm: FormGroup;
  saveEmployeeSubscription: Subscription;
  message: string;

  constructor(private employeeServices: EmployeeServices) {
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
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  public createEmployee = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeCreation(employeeFormValue);
    }
  };

  private executeEmployeeCreation = (employeeFormValue) => {
    const employe = new Employeeforsave(employeeFormValue.nameFormControl, employeeFormValue.surnameFormControl,
      employeeFormValue.ageFormControl, employeeFormValue.citizenFormControl, employeeFormValue.phoneFormControl);
    this.saveEmployeeSubscription = this.employeeServices.saveEmployee(employe).subscribe((response: HttpResponse<any>) => {
      },
      (errorResponse: HttpErrorResponse) => {
        this.message = 'Employee has not been saved';
        console.log(errorResponse);
      },
      () => {
        this.message = 'Employee has been saved succesfully';
      }
    );
  };

  ngOnDestroy(): void {
    if (this.saveEmployeeSubscription !== undefined) {
      this.saveEmployeeSubscription.unsubscribe();
    }

  }
}

