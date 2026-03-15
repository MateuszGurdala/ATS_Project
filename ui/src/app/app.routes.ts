import {Routes} from '@angular/router';
import {MainPage} from '../pages/main-page/main-page';
import {PhotoPage} from '../pages/photo-page/photo-page';
import {pictureResolver} from '../resolvers/picture-resolver';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    resolve: {
      picture: pictureResolver
    }
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
