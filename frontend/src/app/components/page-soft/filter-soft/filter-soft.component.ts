import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateFind} from '../../../model/allclass';


@Component({
  selector: 'app-filter-soft',
  templateUrl: './filter-soft.component.html',
  styleUrls: ['./filter-soft.component.css']
})
export class FilterSoftComponent implements OnInit {

  @Output()
  dateFilterOut = new EventEmitter<DateFind>();

  dateStart: Date;
  dateFinish: Date;
  dateFilter: DateFind;

  constructor() { }

  ngOnInit(): void {
    this.dateStart = new Date(2019, 1, 1);
    this.dateFinish = new Date();
    this.dateFilter = new DateFind(this.dateStart, this.dateFinish);
  }
  startSearch(): void {
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateFinish = this.dateFilter.dateStart;
    }
    this.dateFilterOut.emit(this.dateFilter);
  }

  finishSearch(): void {
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateStart = this.dateFilter.dateFinish;
    }
    // console.log('dateStart = ', this.dateFilter.dateStart);
    // console.log('dateFinish = ', this.dateFilter.dateFinish);
    this.dateFilterOut.emit(this.dateFilter);
  }

  buttonStartClear(): void {
    this.dateFilter.dateStart = this.dateStart;
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateFinish = this.dateFilter.dateStart;
    }
    this.dateFilterOut.emit(this.dateFilter);
  }

  buttonFinishClear(): void {
    this.dateFilter.dateFinish = this.dateFinish;
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateStart = this.dateFilter.dateFinish;
    }
    this.dateFilterOut.emit(this.dateFilter);
  }


}
