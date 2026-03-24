import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpService} from './http-service';
import {BehaviorSubject} from 'rxjs';
import {UploadOptions} from '../types/responses/upload-options';
import {PhotoDetails} from '../types/requests/upload-photo-request';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly toastrService: ToastrService = inject(ToastrService);

  // @ts-ignore
  private fileList: FileList;

  public readonly yearDataSource: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public readonly areaDataSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly parentAreaDataSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly pictureDataSource: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);

  public readonly hasUploadedPictures: WritableSignal<boolean> = signal(false);

  public setUploadPhotos(files: FileList): void {
    this.fileList = files;

    for (const fileIndex in files) {
      if (fileIndex == "length") break;
      this.pictureDataSource.next([...this.pictureDataSource.getValue(), files[fileIndex]])
    }

    this.hasUploadedPictures.set(true);
  }

  public setUploadOptions(options: UploadOptions): void {
    this.yearDataSource.next(options.years)
    this.areaDataSource.next(options.areas)
    this.parentAreaDataSource.next(options.parentAreas)
  }

  public uploadPhoto(file: File, details: PhotoDetails): void {
    this.httpService.postUploadPhoto({photoDetails: details, file: file}).subscribe({
      next: () => {
        const files = this.pictureDataSource.value
        files.splice(files.indexOf(file), 1)

        this.toastrService.info("Zdjęcie zostało zapisane.")
        this.pictureDataSource.next(files);
      },
      error: () => {
        this.toastrService.error("Nie udało się zapisać zdjęcia.", "Błąd")
      }
    })
  }
}
