import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order, StatisticsArray} from '../../model/allclass';

@Component({
  selector: 'app-page-order',
  templateUrl: './page-order.component.html',
  styleUrls: ['./page-order.component.css']
})
export class PageOrderComponent implements OnInit {

  @Input() allOrder: Order[];
  @Input() statArray: StatisticsArray[];
  @Output()
  addOrder = new EventEmitter<Order>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddOrder(order: Order): void {
    this.addOrder.emit(order);
  }
}
