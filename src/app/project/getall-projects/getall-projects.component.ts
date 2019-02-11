import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Employeereceived} from '../../entity/employeereceived';
import {Subscription} from 'rxjs';
import {Projectreceived} from '../../entity/projectreceived';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProjectServices} from '../../services/project.services';

@Component({
  selector: 'app-getall-projects',
  templateUrl: './getall-projects.component.html',
  styleUrls: ['./getall-projects.component.css']
})
export class GetallProjectsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() index;
  displayedColumns: string[] = ['projectId', 'name', 'startDate', 'endDate', 'description', 'details', 'update', 'delete'];
  dataSource: Employeereceived[] = [];
  deleteProjectSubscription: Subscription;
  subscriber: Subscription;

  constructor(private router: Router, private projectService: ProjectServices) {
  }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.subscriber = this.projectService.getAllProjectsRequest().subscribe(
      (projectData: Projectreceived[]) => {
        this.dataSource = this.projectService.getAndMapProjectData(projectData);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['index'] && this.index === 0) {
      this.subscriber = this.projectService.getAllProjectsRequest().subscribe(
        (projectData: Projectreceived[]) => {
          this.dataSource = this.projectService.getAndMapProjectData(projectData);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        });
    }
  }

  public redirectToDetails = (id: string) => {
    this.router.navigate(['/projects/list/', id]);
  };

  public redirectToUpdate = (id: string) => {

  };

  public redirectToDelete = (id: string) => {

    const deleteProjectId = +id;

    this.deleteProjectSubscription = this.projectService.deleteProject(deleteProjectId).subscribe((response: HttpResponse<any>) => {
        console.log(response);
        this.getAllProjects();
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
    }// ;
  }

}
