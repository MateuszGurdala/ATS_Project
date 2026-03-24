import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {Dropzone} from '../../components/dropzone/dropzone';
import {PhotoUploadPreview} from '../../components/photo-upload-preview/photo-upload-preview';
import {UploadService} from '../../services/upload-service';

@Component({
  selector: 'app-add-photo-page',
  imports: [
    AsyncPipe,
    Dropzone,
    PhotoUploadPreview
  ],
  templateUrl: './add-photo-page.html',
  styleUrl: './add-photo-page.css',
})
export class AddPhotoPage {
  public readonly uploadService: UploadService = inject(UploadService)

  public onPhotosUploaded(files: FileList) {
    this.uploadService.setUploadPhotos(files)
  }
}
