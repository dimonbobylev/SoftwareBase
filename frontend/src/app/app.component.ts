import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DateFind, Order, SoftCD, StatisticsArray, StatisticsArrayOrder} from './model/allclass';
import {DataHandlerService} from './service/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allSoft: SoftCD[];
  allOrder: Order[];
  onDateFilter: DateFind;
  statisticsArray: StatisticsArray[] = [];
  statisticsArrayOrder: StatisticsArrayOrder[] = [];
  toggleArticle = true;
  toggleOrder = false;

  constructor(
    private dataHandler: DataHandlerService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getSoft();
    this.onDateFilter = new DateFind(new Date(2019, 1, 1), new Date());
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
        this.statisticsArrayOrder = this.dataHandler.getStatisticsOrder(this.allOrder);
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
    this.onDateFilter = dateFil;
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
  // клик на инвентарный номер эталона
  invNumberClick(elementSoft: SoftCD): void {
    this.toggleArticle = false;
    this.toggleOrder = true;
    this.http.post<any>('http://127.0.0.1:5000/invClick', elementSoft)
      .subscribe(back => this.allOrder = back);
  }
  // добавление приказа КЧ
  onAddOrder(order: Order): void {
    this.http.post<any>('http://127.0.0.1:5000/onAddOrder', order)
      .subscribe(back => {
        this.allOrder = back;
        this.statisticsArrayOrder = this.dataHandler.getStatisticsOrder(this.allOrder);
      });
  }
  // удаление приказа КЧ
  onDeleteOrder(order: Order): void {
    this.http.post<any>('http://127.0.0.1:5000/onDeleteOrder', order)
      .subscribe(back => {
        this.allOrder = back;
        this.statisticsArrayOrder = this.dataHandler.getStatisticsOrder(this.allOrder);
      });
  }
  // обновление приказа КЧ
  onUpdateOrder(order: Order): void {
    this.http.post<any>('http://127.0.0.1:5000/onUpdateOrder', order)
      .subscribe(back => {
        // console.log('onUpdateSoft: ' , back);
        this.allOrder = back;
        this.statisticsArrayOrder = this.dataHandler.getStatisticsOrder(this.allOrder);
      });
  }

  createFileSoft(): void {
    this.http.post<any>('http://127.0.0.1:5000/onCreateFile', this.onDateFilter)
      .subscribe();
  }

  createFileOrder(): void {
    this.http.post<any>('http://127.0.0.1:5000/onCreateFileOrder', this.onDateFilter)
      .subscribe();
  }
}
