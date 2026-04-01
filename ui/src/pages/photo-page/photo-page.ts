import {ActivatedRoute} from '@angular/router';
import {Component, inject, signal, WritableSignal} from '@angular/core';
import {Config} from '../../app/config';
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
  protected readonly Config = Config;
  public pictureId: WritableSignal<number> = signal(0);
  public extension: WritableSignal<string> = signal("");

  constructor() {
    this.pictureId.set(this.activatedRoute.snapshot.params['id']);
    this.extension.set(this.activatedRoute.snapshot.queryParams['ext']);
  }
}
