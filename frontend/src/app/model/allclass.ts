export class SoftCD {
  id: number;
  inv: string;
  date: Date;
  article: string;
  os?: string;
  title?: string;

  constructor(id: number, inv: string, date: Date, article: string, os?: string, title?: string) {
    this.id = id;
    this.inv = inv;
    this.date = date;
    this.article = article;
    this.os = os;
    this.title = title;
  }
}
export class Order {
  inv: string;
  order: string;
  dateOrder: Date;
  count: number;
  time: number;
  act?: string;
  title?: string;

  constructor(inv: string, order: string, dateOrder: Date, count: number, time: number, act?: string, title?: string) {
    this.inv = inv;
    this.order = order;
    this.dateOrder = dateOrder;
    this.count = count;
    this.time = time;
    this.act = act;
    this.title = title;
  }
}
export class DateFind {
  dateStart: Date;
  dateFinish: Date;

  constructor(dateStart: Date, dateFinish: Date) {
    this.dateStart = dateStart;
    this.dateFinish = dateFinish;
  }
}
export class StatisticsArray  {
  year: number;
  count: number;

  constructor(year: number, count: number) {
    this.year = year;
    this.count = count;
  }
}
