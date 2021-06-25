import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateFind, SoftCD} from '../../model/allclass';

@Component({
  selector: 'app-page-soft',
  templateUrl: './page-soft.component.html',
  styleUrls: ['./page-soft.component.css']
})
export class PageSoftComponent implements OnInit {

  @Input() allSoft: SoftCD[];
  @Output()
  addSoft = new EventEmitter<SoftCD>();
  @Output()
  updateSoft = new EventEmitter<SoftCD>();
  @Output()
  deleteSoft = new EventEmitter<SoftCD>();
  @Output()
  dateFilterOut = new EventEmitter<DateFind>();

  constructor() { }

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
}
