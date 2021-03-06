import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageSoftComponent } from './components/page-soft/page-soft.component';
import { PageOrderComponent } from './components/page-order/page-order.component';
import { TableSoftComponent } from './components/page-soft/table-soft/table-soft.component';
import { StatisticsSoftComponent } from './components/page-soft/statistics-soft/statistics-soft.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {EditDialogComponent} from './dialog/edit-dialog/edit-dialog.component';
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { StatisticsOrderComponent } from './components/page-order/statistics-order/statistics-order.component';
import { TableOrderComponent } from './components/page-order/table-order/table-order.component';
import { EditDialogOrderComponent } from './dialog/edit-dialog-order/edit-dialog-order.component';
import { FilterDataComponent } from './components/filter-data/filter-data.component';

@NgModule({
  declarations: [
    AppComponent,
    PageSoftComponent,
    PageOrderComponent,
    TableSoftComponent,
    StatisticsSoftComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
    StatisticsOrderComponent,
    TableOrderComponent,
    EditDialogOrderComponent,
    FilterDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  entryComponents: [
    EditDialogComponent,
    EditDialogOrderComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
