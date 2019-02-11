import {Component, OnInit} from '@angular/core';

import {MatTabChangeEvent} from '@angular/material';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  index = 3;

  constructor() {
  }

  ngOnInit() {

  }

  public executeSelectedChange = (event) => {
    let index = +<MatTabChangeEvent>event.index;
    this.index = index;
  };


}
