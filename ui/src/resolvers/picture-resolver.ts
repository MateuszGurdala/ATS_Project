import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {SearchService} from '../services/search-service';
import {inject} from '@angular/core';
import {DUMMY_AREAS, DUMMY_YEARS} from '../dummy-data';

export const pictureResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const searchService: SearchService = inject(SearchService);

  searchService.setAvailableYears(DUMMY_YEARS);
  searchService.setAvailableAreas(DUMMY_AREAS);
  searchService.reset();

  return true;
};
