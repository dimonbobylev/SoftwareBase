import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Order, SoftCD, StatisticsArray, StatisticsArrayOrder} from '../model/allclass';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  statisticsArray: StatisticsArray[] = [];
  statisticsArrayOrder: StatisticsArrayOrder[] = [];
  // softSubject = new Subject<SoftCD[]>();


  constructor() { }

// подсчет статистики по годам для поставок СПО
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
  // подсчет статистики по годам для приказов КЧ с подсчетом количества АРМ и времени на установку
  getStatisticsOrder(order: Order[]): StatisticsArrayOrder[] {
    for (const item of order) {
      const year = (String(item.date)).slice(0, 4);
      const intYear = +year;
      let boolYear = false;
      if (this.statisticsArrayOrder) {
        for (const count of this.statisticsArrayOrder) {
          if (intYear === count.year) {
            boolYear = true;
            break;
          }
        }
      }
      if (boolYear === false) {
        const stArr: StatisticsArrayOrder = new StatisticsArrayOrder(intYear, '');
        this.statisticsArrayOrder.push(stArr);
      }
    }
    for (const item of this.statisticsArrayOrder) {
      let count1 = 0;
      let count2 = 0;
      for (const item1 of order) {
        const year = String(item1.date).slice(0, 4);
        const intYear = +year;
        if (item.year ===  intYear) {
          count1 = count1 + item1.count;
          count2 = count2 + item1.time;
        }
      }
      item.count = String(count1) + '/' + String(count2);
    }
    return this.statisticsArrayOrder;
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }
}
