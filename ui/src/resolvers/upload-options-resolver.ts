import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {HttpService} from '../services/http-service';
import {UploadService} from '../services/upload-service';

export const uploadOptionsResolver: ResolveFn<boolean> = (route, state) => {
  void route, state;

  const uploadService: UploadService = inject(UploadService);
  const httpService: HttpService = inject(HttpService);

  httpService.getUploadOptions().subscribe((options) => {
    uploadService.setUploadOptions(options);
  })

  return true;
};
