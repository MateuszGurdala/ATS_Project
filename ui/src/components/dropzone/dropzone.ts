import {Component, output, OutputEmitterRef} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dropzone',
  imports: [
    MatIcon
  ],
  templateUrl: './dropzone.html',
  styleUrl: './dropzone.css',
})
export class Dropzone {
  public readonly photosUploaded: OutputEmitterRef<FileList> = output<FileList>()

  public onFileUpload(event: Event) {
    event.preventDefault();
    const fileList: FileList = event.type == "change"
      ? (<any>event.target)!.files
      : (<DragEvent>event).dataTransfer!.files;

    this.photosUploaded.emit(fileList);
  }

  public onDragOver(event: Event) {
    event.preventDefault();
  }
}
