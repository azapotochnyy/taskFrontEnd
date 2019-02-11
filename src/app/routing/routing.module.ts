import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from '../employee/employee.component';
import {ProjectComponent} from '../project/project.component';
import {GetListOfParticipantsComponent} from '../project/get-list-of-participants/get-list-of-participants.component';
import {UpdateEmployeeComponent} from '../employee/update-employee/update-employee.component';

const routes: Routes = [
  {path: 'employees', component: EmployeeComponent},
  {path: 'employees/:id', component: UpdateEmployeeComponent},
  {path: 'projects', component: ProjectComponent},
  {path: 'projects/list/:id', component: GetListOfParticipantsComponent},
  {path: '', redirectTo: '/employees', pathMatch: 'full'}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {
}
