import {HttpService} from '../services/http-service';
import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';

export const pictureDetailsResolver: ResolveFn<boolean> = (route, state) => {
  void state;
  inject(HttpService).getPictureDetails(route.params['id']);
  return true;
};
