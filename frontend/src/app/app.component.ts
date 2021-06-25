import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DateFind, SoftCD} from './model/allclass';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allSoft: SoftCD[];
  toggleArticle = true;
  toggleOrder = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:5000/softCD')
      .subscribe(back => this.allSoft = back);
  }

  toggleArticleClick(): void {
    this.toggleArticle = true;
    this.toggleOrder = false;
  }

  toggleOrderClick(): void {
    this.toggleArticle = false;
    this.toggleOrder = true;
  }
  // добавление эталона
  onAddSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onAddSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
        // this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // обновление эталона
  onUpdateSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onUpdateSoft', soft)
      .subscribe(back => {
        // console.log('onUpdateSoft: ' , back);
        this.allSoft = back;
        // this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // удаление эталона
  onDeleteSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onDeleteSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
        // this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // выборка эталонов по дате
  dateFilter(dateFil: DateFind): void {
    this.http.post<any>('http://127.0.0.1:5000/onDateFilter', dateFil)
      .subscribe(back => this.allSoft = back);
  }
}
