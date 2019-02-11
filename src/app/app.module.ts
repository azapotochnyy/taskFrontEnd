import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainpageComponent } from './mainpage/mainpage/mainpage.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './project/project.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeServices} from './services/employee.services';
import {ProjectServices} from './services/project.services';
import {SaveEmployeeComponent} from './employee/save-employee/save-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {RoutingModule} from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SaveProjectComponent } from './project/save-project/save-project.component';
import { GetallEmployeesComponent } from './employee/getall-employees/getall-employees.component';
import { GetallProjectsComponent } from './project/getall-projects/getall-projects.component';
import { GetListOfParticipantsComponent } from './project/get-list-of-participants/get-list-of-participants.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    EmployeeComponent,
    ProjectComponent,
    SaveEmployeeComponent,
    HeaderComponent,
    SaveProjectComponent,
    GetallEmployeesComponent,
    GetallProjectsComponent,
    GetListOfParticipantsComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
      ],
  providers: [ProjectServices, EmployeeServices],
  bootstrap: [AppComponent]
})
export class AppModule {
}
