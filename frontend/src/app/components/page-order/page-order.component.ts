import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateFind, Order, StatisticsArrayOrder} from '../../model/allclass';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-page-order',
  templateUrl: './page-order.component.html',
  styleUrls: ['./page-order.component.css']
})
export class PageOrderComponent implements OnInit {

  @Input() allOrder: Order[];
  @Input() statArray: StatisticsArrayOrder[];
  @Output()
  addOrder = new EventEmitter<Order>();
  @Output()
  deleteOrder = new EventEmitter<Order>();
  @Output()
  updateOrder = new EventEmitter<Order>();
  @Output()
  onCreateFile = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onAddOrder(order: Order): void {
    this.addOrder.emit(order);
  }
  onUpdateOrder(order: Order): void {
    this.updateOrder.emit(order);
  }
  onDeleteOrder(order: Order): void {
    this.deleteOrder.emit(order);
  }

  dateFilter(dateFil: DateFind): void {
    this.http.post<any>('http://127.0.0.1:5000/onDateFilterOrder', dateFil)
      .subscribe(back => this.allOrder = back);
  }

  createFile(create: boolean): void {
    this.onCreateFile.emit(create);
    // console.log('PageSoftComponent ', create);
  }
}
