import {HttpService} from '../services/http-service';
import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';

export const uploadOptionsResolver: ResolveFn<boolean> = (route, state) => {
  void route, state;

  inject(HttpService).getUploadOptions();

  return true;
};
