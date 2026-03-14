import { Component } from '@angular/core';

@Component({
  selector: 'app-picture-grid',
  imports: [],
  templateUrl: './picture-grid.html',
  styleUrl: './picture-grid.css',
})
export class PictureGrid {
  public images: number[] = [1, 2, 3, 4, 5, 6];
}
