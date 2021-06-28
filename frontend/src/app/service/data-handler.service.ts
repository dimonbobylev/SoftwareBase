import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Order, SoftCD, StatisticsArray} from '../model/allclass';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  statisticsArray: StatisticsArray[] = [];
  softSubject = new Subject<SoftCD[]>();


  constructor() { }

// подсчет статистики по годам для поставок СПО, а также для приказов КЧ
  getStatistics(soft: SoftCD[] | Order[]): StatisticsArray[] {
    // console.log('DataHandlerService: ', soft);
    for (const item of soft) {
      const year = (String(item.date)).slice(0, 4);
      const intYear = +year;
      let boolYear = false;
      if (this.statisticsArray) {
        for (const count of this.statisticsArray) {
          if (intYear === count.year) {
            boolYear = true;
            break;
          }
        }
      }
      if (boolYear === false) {
        const stArr: StatisticsArray = new StatisticsArray(intYear, 0);
        this.statisticsArray.push(stArr);
      }
    }
    let countYear = 0;
    for (const item of this.statisticsArray) {
      let counter = 0;
      for (const item1 of soft) {
        const year = String(item1.date).slice(0, 4);
        const intYear = +year;
        if (item.year ===  intYear) {
          counter = counter + 1;
          // console.log('item.year: ', item.year, ' intYear: ', intYear, ' counter: ', counter);
        }
      }
      this.statisticsArray[countYear].count = counter;
      // console.log('year: ', this.statisticsArray[countYear].count, ' countYear: ', countYear, ' counter: ', counter);
      countYear = countYear + 1;
    }
    // console.log('DataHandlerService: ' , this.statisticsArray);
    return this.statisticsArray;
  }
}
