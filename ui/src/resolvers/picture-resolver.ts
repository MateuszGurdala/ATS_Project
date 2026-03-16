import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {SearchService} from '../services/search-service';
import {inject} from '@angular/core';
import {HttpService} from '../services/http-service';

export const pictureResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  void route, state;

  const searchService: SearchService = inject(SearchService);
  const httpService: HttpService = inject(HttpService);

  httpService.getAvailableYears().subscribe((years) => {
    searchService.setAvailableYears(years);
  });

  httpService.getAreas().subscribe((areas) => {
    searchService.setAvailableAreas(areas);
    searchService.init();
    searchService.loadPictures();
  });

  return true;
};
