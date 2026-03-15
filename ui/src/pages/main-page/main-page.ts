import {Component, inject, OnInit} from '@angular/core';
import {BrowserPanel} from '../../components/browser-panel/browser-panel';
import {PictureGrid} from '../../components/picture-grid/picture-grid';
import {Title} from '@angular/platform-browser';
import {SearchService} from '../../services/search-service';

@Component({
  selector: 'app-main-page',
  imports: [
    PictureGrid,
    BrowserPanel
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage implements OnInit {
  private readonly title: Title = inject(Title)
  private readonly searchService: SearchService = inject(SearchService);

  constructor() {
    this.title.setTitle("Nasz Ursynów")
  }

  ngOnInit(): void {
    this.searchService.setQueryParams()
  }
}
