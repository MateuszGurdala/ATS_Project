import {Routes} from '@angular/router';
import {MainPage} from '../pages/main-page/main-page';
import {PhotoPage} from '../pages/photo-page/photo-page';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPage
  },
  {
    path: 'picture/:id',
    component: PhotoPage
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
