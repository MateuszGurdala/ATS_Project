import {ResolveFn} from '@angular/router';
import {HttpService} from '../services/http-service';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';
import {PictureDetailsResponse} from '../types/responses/picture-details-response';

export const pictureDetailsResolver: ResolveFn<Observable<PictureDetailsResponse>> = (route, state) => {
  void state;
  const httpService: HttpService = inject(HttpService);
  return httpService.getPictureDetails(route.params['id']);
};
