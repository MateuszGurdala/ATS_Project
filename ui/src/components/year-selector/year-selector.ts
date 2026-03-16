import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SearchService} from '../../services/search-service';

@Component({
  selector: 'app-year-selector',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './year-selector.html',
  styleUrl: './year-selector.css',
})
export class YearSelector {
  public readonly searchService: SearchService = inject(SearchService);
}
