import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  standalone: true,
  imports: [
    NgClass
  ]
})
export class ListItemComponent  {
  @Input() customClasses: string = '';

  constructor() { }


}
