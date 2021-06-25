import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Setting} from '../../model/setting';
import {SoftCD} from '../../model/allclass';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  dialogTitle: string; // заголовок окна
  soft: SoftCD; // эталон для редактирования/создания
  // article: string[] = ['K-420K', 'K-700', 'K-460'];
  article: string[];
  os: string[];
  osForArticle: string[];
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  tmpTitle: string;
  tmpArticle: string;
  tmpOs: string;
  tmpNom: string;
  tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [SoftCD, string], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  ngOnInit(): void {
    this.article = Setting.article;  // данные из фаила setting.ts
    this.os = Setting.os;
    this.osForArticle = Setting.articleOS;
    this.soft = this.data[0];
    this.dialogTitle = this.data[1];

    this.tmpTitle = this.soft.title;
    this.tmpNom = this.soft.inv;
    this.tmpArticle = this.soft.article;
    this.tmpDate = new Date(this.soft.date);
    this.tmpOs = this.soft.os;
  }
  // нажали ОК
  onConfirm(): void {
    // считываем все значения для сохранения в поля редактирования
    this.soft.title = this.tmpTitle;
    this.soft.article = this.tmpArticle;
    this.soft.date = this.tmpDate;
    this.soft.inv = this.tmpNom;
    this.soft.os = this.tmpOs;
    // передаем добавленный/измененный эталон в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.soft);
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
        message: `Вы действительно хотите удалить эталон из базы?`
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
