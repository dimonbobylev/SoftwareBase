import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateFind, SoftCD, StatisticsArray} from '../../model/allclass';
import {DataHandlerService} from '../../service/data-handler.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-page-soft',
  templateUrl: './page-soft.component.html',
  styleUrls: ['./page-soft.component.css']
})
export class PageSoftComponent implements OnInit {

  articleStatistics: string;
  statisticsArray: StatisticsArray[] = [];

  @Input() allSoft: SoftCD[];
  @Output()
  addSoft = new EventEmitter<SoftCD>();
  @Output()
  updateSoft = new EventEmitter<SoftCD>();
  @Output()
  deleteSoft = new EventEmitter<SoftCD>();
  @Output()
  invNumClick = new EventEmitter<SoftCD>();
  @Output()
  dateFilterOut = new EventEmitter<DateFind>();
  @Output()
  onCreateFile = new EventEmitter<boolean>();
  @Input() statArray: StatisticsArray[];

  constructor(
    private dataHandler: DataHandlerService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }

  onDeleteSoft(soft: SoftCD): void {
    this.deleteSoft.emit(soft);
  }

  onAddSoft(soft: SoftCD): void {
    this.addSoft.emit(soft);
  }

  onUpdateSoft(soft: SoftCD): void {
    this.updateSoft.emit(soft);
  }

  dateFilter(dateFil: DateFind): void {
    this.dateFilterOut.emit(dateFil);
  }

  articleStat(article: SoftCD): void {
    this.articleStatistics = article.article;
    this.http.post<any>('http://127.0.0.1:5000/onArticleStat', article)
      .subscribe(back => {
        this.statisticsArray = this.dataHandler.getStatistics(back);
      });
  }

  invNumberClick(invClick: SoftCD): void {
    this.invNumClick.emit(invClick);
  }

  createFile(create: boolean): void {
    this.onCreateFile.emit(create);
    // console.log('PageSoftComponent ', create);
  }
}
