import {Component, Inject, OnInit} from '@angular/core';
import {Order} from '../../model/allclass';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-dialog-order',
  templateUrl: './edit-dialog-order.component.html',
  styleUrls: ['./edit-dialog-order.component.css']
})
export class EditDialogOrderComponent implements OnInit {
  dialogTitle: string; // заголовок окна
  order: Order;
  tmpInv: string;
  tmpOrder: string;
  tmpDate: Date;
  tmpCount: number;
  tmpTime: number;
  tmpAct: string;
  tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditDialogOrderComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Order, string], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  ngOnInit(): void {
    this.order = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpInv = this.order.inv;
    this.tmpOrder = this.order.ord;
    this.tmpDate = this.order.date;
    this.tmpCount = this.order.count;
    this.tmpTime = this.order.time;
    this.tmpAct = this.order.act;
    this.tmpTitle = this.order.title;
  }
  // нажали ОК
  onConfirm(): void {
    // считываем все значения для сохранения в поля редактирования
    this.order.inv = this.tmpInv;
    this.order.ord = this.tmpOrder;
    this.order.date = this.tmpDate;
    this.order.count = this.tmpCount;
    this.order.time = this.tmpTime;
    this.order.act = this.tmpAct;
    this.order.title = this.tmpTitle;
    // передаем добавленный/измененный эталон в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.order);
    // console.log('editDialog: ', this.tmpDate);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приказ КЧ из базы?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }
}
