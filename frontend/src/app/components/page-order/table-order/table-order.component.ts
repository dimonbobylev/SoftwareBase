import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Order} from '../../../model/allclass';
import {MatDialog} from '@angular/material/dialog';
import {EditDialogOrderComponent} from '../../../dialog/edit-dialog-order/edit-dialog-order.component';
import {ConfirmDialogComponent} from '../../../dialog/confirm-dialog/confirm-dialog.component';
import {DataHandlerService} from '../../../service/data-handler.service';


@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.css']
})
export class TableOrderComponent implements OnInit {

  dataSource: MatTableDataSource<Order>; // контейнер - источник данных для таблицы
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['id', 'inv', 'ord', 'date', 'count', 'time', 'act', 'title', 'operations'];

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  allOrder: Order[];
  onCreateFile = false;

  // текущие задачи для отображения на странице
  @Input('orders')
  private set setOrders(orders: Order[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.allOrder = orders;
    this.fillTable();
  }
  @Output()
  addOrder = new EventEmitter<Order>();
  @Output()
  deleteOrder = new EventEmitter<Order>();
  @Output()
  updateOrder = new EventEmitter<Order>();
  @Output()
  onCreateFileOrder = new EventEmitter<boolean>();

  constructor(
    private dataHandler: DataHandlerService, // доступ к данным
    private dialog: MatDialog // работа с диалоговым окном
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // обновляем таблицу
  fillTable(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.allOrder; // обновить источник данных (т.к. данные массива soft обновились)
    this.addTableObjects();
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  openAddOrderDialog(): void {
    // то же самое, что и при редактировании, но только передаем пустой объект Order
    const order = new Order(null, '', '', new Date(''), null, null, '', '');

    const dialogRef = this.dialog.open(EditDialogOrderComponent, {data: [order, 'Добавление приказа КЧ']});

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addOrder.emit(order);
      }
    });
  }

  openDeleteOrderDialog(order: Order): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить эталон?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteOrder.emit(order);
        // console.log('openDeleteOrderDialog');
      }
    });
  }

  openEditOrderDialog(element: Order): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditDialogOrderComponent, {data: [element, 'Редактирование'], autoFocus: false});
    dialogRef.afterClosed().subscribe( result => {
      if (result === 'delete') {
        this.deleteOrder.emit(element);
        return;
      }
      // обработка результатов
      if (result as Order) { // если нажали ОК и есть результат
        this.updateOrder.emit(result);
        return;
      }
    });
  }

  createFile(): void {
    this.onCreateFile = true;
    this.onCreateFileOrder.emit(this.onCreateFile);
  }
}
