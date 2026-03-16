import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PictureDetails} from '../../components/picture-details/picture-details';

@Component({
  selector: 'app-photo-page',
  imports: [
    PictureDetails
  ],
  templateUrl: './photo-page.html',
  styleUrl: './photo-page.css',
})
export class PhotoPage {
  private activatedRoute = inject(ActivatedRoute);
  public pictureId: number;

  constructor() {
    this.pictureId = this.activatedRoute.snapshot.params['id'];
  }
}
