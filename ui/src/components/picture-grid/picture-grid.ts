import {Component, inject} from '@angular/core';
import {SearchService} from '../../services/search-service';

@Component({
  selector: 'app-picture-grid',
  imports: [],
  templateUrl: './picture-grid.html',
  styleUrl: './picture-grid.css',
})
export class PictureGrid {
  public searchService: SearchService = inject(SearchService);
}
