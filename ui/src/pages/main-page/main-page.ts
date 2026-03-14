import { Component } from '@angular/core';
import {BrowserPanel} from '../../components/browser-panel/browser-panel';
import {PictureGrid} from '../../components/picture-grid/picture-grid';

@Component({
  selector: 'app-main-page',
  imports: [
    PictureGrid,
    BrowserPanel
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
