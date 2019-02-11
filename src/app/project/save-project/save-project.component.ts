import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ProjectServices} from '../../services/project.services';
import {Projectforsave} from '../../entity/projectforsave';

@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.css']
})
export class SaveProjectComponent implements OnInit, OnDestroy {

  public projectForm: FormGroup;
  saveProjectSubscription: Subscription;
  message: string;

  constructor(private projectService: ProjectServices) {
    this.projectForm = new FormGroup({
      name:
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      startDate:
        new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^(0|[1-9][0-9]*)$'),

        ]),
      endDate:
        new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ]),
      description:
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ]),
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.projectForm.controls[controlName].hasError(errorName);
  };

  public createProject = (projectForValue) => {
    console.log(projectForValue);
    if (this.projectForm.valid) {
      this.executeEmployeeCreation(projectForValue);
    }
  };

  private executeEmployeeCreation = (projectForValue) => {
    const project = new Projectforsave(projectForValue.name, projectForValue.startDate, projectForValue.endDate, projectForValue.description);
    this.saveProjectSubscription = this.projectService.saveProject(project).subscribe((response: HttpResponse<any>) => {
      },
      (errorResponse: HttpErrorResponse) => {
        this.message = 'Project has not been saved';
      },
      () => {
        this.message = 'Project has been saved succesfully';
      }
    );
  };

  ngOnDestroy(): void {
    if (this.saveProjectSubscription !== undefined) {
      this.saveProjectSubscription.unsubscribe();
    }
  }
}
