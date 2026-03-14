import {Component, inject} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';

@Component({
  selector: 'app-picture-details',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './picture-details.html',
  styleUrl: './picture-details.css',
})
export class PictureDetails {
  private location: Location = inject(Location);

  public onGoBack(): void {
    this.location.back()
  }
}
