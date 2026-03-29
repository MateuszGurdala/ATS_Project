import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {HttpService} from '../services/http-service';
import {inject} from '@angular/core';

export const adminPictureResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  void route, state;
  const httpService: HttpService = inject(HttpService);
  httpService.getAdminPictures(null);
  return true;
};
