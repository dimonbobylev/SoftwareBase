import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleArticle = true;
  toggleOrder = false;

  toggleArticleClick(): void {
    this.toggleArticle = true;
    this.toggleOrder = false;
  }

  toggleOrderClick(): void {
    this.toggleArticle = false;
    this.toggleOrder = true;
  }
}
