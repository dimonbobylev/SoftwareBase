import {Component, Input, OnInit} from '@angular/core';
import {StatisticsArray} from '../../../model/allclass';

@Component({
  selector: 'app-statistics-soft',
  templateUrl: './statistics-soft.component.html',
  styleUrls: ['./statistics-soft.component.css']
})
export class StatisticsSoftComponent implements OnInit {

  @Input() articleStatistics: string;
  @Input() statArray: StatisticsArray[];

  constructor() { }

  ngOnInit(): void {
  }

}
