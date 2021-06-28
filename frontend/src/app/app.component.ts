import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DateFind, Order, SoftCD, StatisticsArray} from './model/allclass';
import {DataHandlerService} from './service/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allSoft: SoftCD[];
  allOrder: Order[];
  statisticsArray: StatisticsArray[] = [];
  toggleArticle = true;
  toggleOrder = false;

  constructor(
    private dataHandler: DataHandlerService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getSoft();
  }

  toggleArticleClick(): void {
    this.toggleArticle = true;
    this.toggleOrder = false;
    this.getSoft();
  }

  toggleOrderClick(): void {
    this.toggleArticle = false;
    this.toggleOrder = true;
    this.http.get<any>('http://127.0.0.1:5000/allOrder')
      .subscribe(back => {
        this.allOrder = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allOrder);
      });
  }
  // добавление эталона
  onAddSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onAddSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // обновление эталона
  onUpdateSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onUpdateSoft', soft)
      .subscribe(back => {
        // console.log('onUpdateSoft: ' , back);
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // удаление эталона
  onDeleteSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onDeleteSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // выборка эталонов по дате
  dateFilter(dateFil: DateFind): void {
    this.http.post<any>('http://127.0.0.1:5000/onDateFilter', dateFil)
      .subscribe(back => this.allSoft = back);
  }
  getSoft(): void {
    this.http.get<any>('http://127.0.0.1:5000/softCD')
      .subscribe(back => {
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }

  onAddOrder(order: Order): void {
    this.http.post<any>('http://127.0.0.1:5000/onAddOrder', order)
      .subscribe(back => {
        this.allOrder = back;
        // console.log(this.allOrder);
        this.statisticsArray = this.dataHandler.getStatistics(this.allOrder);
      });
  }
}
