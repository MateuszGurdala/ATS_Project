import {Component, inject} from '@angular/core';
import {BrowserPanel} from '../../components/browser-panel/browser-panel';
import {PictureGrid} from '../../components/picture-grid/picture-grid';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  imports: [
    PictureGrid,
    BrowserPanel
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  private readonly title: Title = inject(Title)

  constructor() {
    this.title.setTitle("Nasz Ursynów")
  }
}
