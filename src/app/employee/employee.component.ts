import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  index = 3;

  constructor() {
  }

  ngOnInit() {
  }

  public executeSelectedChange = (event) => {
    let index = +<MatTabChangeEvent>event.index;
    this.index = index;
  };

  ngOnDestroy(): void {
  }

}


