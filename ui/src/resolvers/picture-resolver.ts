import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {HttpService} from '../services/http-service';
import {SearchService} from '../services/search-service';
import {combineLatest} from 'rxjs';
import {inject} from '@angular/core';

export const pictureResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  void route, state;

  const searchService: SearchService = inject(SearchService);
  const httpService: HttpService = inject(HttpService);

  combineLatest([httpService.yearsDataSource, httpService.areasDataSource]).subscribe(() => searchService.loadPictures());

  httpService.getAvailableYears();
  httpService.getAreas();

  return true;
};
