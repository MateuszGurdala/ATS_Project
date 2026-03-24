import {ResolveFn} from '@angular/router';
import {HttpService} from '../services/http-service';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';
import {PictureDetails} from '../types/responses/picture-details';

export const pictureDetailsResolver: ResolveFn<Observable<PictureDetails>> = (route, state) => {
  void state;
  const httpService: HttpService = inject(HttpService);
  return httpService.getPictureDetails(route.params['id']);
};
