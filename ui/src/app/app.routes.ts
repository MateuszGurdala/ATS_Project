import {AddPhotoPage} from '../pages/add-photo-page/add-photo-page';
import {LoginPage} from '../pages/login-page/login-page';
import {MainPage} from '../pages/main-page/main-page';
import {PhotoPage} from '../pages/photo-page/photo-page';
import {Routes} from '@angular/router';
import {pictureResolver} from '../resolvers/picture-resolver';
import {routeGuard} from '../guards/route-guard';
import {uploadOptionsResolver} from '../resolvers/upload-options-resolver';
import {pictureDetailsResolver} from '../resolvers/picture-details-resolver';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    title: "Nasz Ursynów",
    resolve: {
      picture: pictureResolver
    }
  },
  {
    path: 'picture/:id',
    component: PhotoPage,
    title: "Zdjęcie",
    resolve: {
      details: pictureDetailsResolver
    }
  },
  {
    path: 'upload',
    component: AddPhotoPage,
    title: "Dodaj zdjęcia",
    canActivate: [routeGuard],
    resolve: {
      picture: uploadOptionsResolver
    }
  },
  {
    path: 'login',
    component: LoginPage,
    title: "Zaloguj się"
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
