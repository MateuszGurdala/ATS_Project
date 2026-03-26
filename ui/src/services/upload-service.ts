import {BehaviorSubject} from 'rxjs';
import {HttpService} from './http-service';
import {PhotoDetails} from '../types/requests/upload-photo-request';
import {UploadOptions} from '../types/responses/upload-options';
import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly toastrService: ToastrService = inject(ToastrService);

  public readonly yearDataSource: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public readonly areaDataSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly parentAreaDataSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly pictureDataSource: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);

  public readonly hasUploadedPictures: WritableSignal<boolean> = signal(false);

  constructor() {
    this.httpService.optionsDataSource.subscribe((value: UploadOptions): void => this.setUploadOptions(value))
  }

  public setUploadPhotos(files: FileList): void {
    for (const fileIndex in files) {
      if (fileIndex == "length") break;
      this.pictureDataSource.next([...this.pictureDataSource.getValue(), files[fileIndex]])
    }

    this.hasUploadedPictures.set(true);
  }

  private setUploadOptions(options: UploadOptions): void {
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

        if (files.length != 0)
          this.pictureDataSource.next(files);
        else
          this.hasUploadedPictures.set(false);
      },
      error: () => {
        this.toastrService.error("Nie udało się zapisać zdjęcia.", "Błąd")
      }
    })
  }

  public updatePhotoDetails(id: number, details: PhotoDetails) {
    return this.httpService.putUpdatePhoto({
      ...details,
      id: id
    })
  }
}
