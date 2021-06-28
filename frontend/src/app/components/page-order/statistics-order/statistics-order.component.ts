import {Component, Input, OnInit} from '@angular/core';
import {StatisticsArray} from '../../../model/allclass';

@Component({
  selector: 'app-statistics-order',
  templateUrl: './statistics-order.component.html',
  styleUrls: ['./statistics-order.component.css']
})
export class StatisticsOrderComponent implements OnInit {

  @Input() statArray: StatisticsArray[];

  constructor() { }

  ngOnInit(): void {
  }

}
