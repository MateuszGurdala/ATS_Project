import {AddPhotoPage} from '../pages/add-photo-page/add-photo-page';
import {LoginPage} from '../pages/login-page/login-page';
import {MainPage} from '../pages/main-page/main-page';
import {PhotoPage} from '../pages/photo-page/photo-page';
import {Routes} from '@angular/router';
import {pictureResolver} from '../resolvers/picture-resolver';
import {routeGuard} from '../guards/route-guard';
import {uploadOptionsResolver} from '../resolvers/upload-options-resolver';
import {pictureDetailsResolver} from '../resolvers/picture-details-resolver';
import {AdminPage} from '../pages/admin-page/admin-page';
import {adminGuard} from '../guards/admin-guard';
import {adminPictureResolver} from '../resolvers/admin-picture-resolver';

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
      details: pictureDetailsResolver, uploadOptionsResolver
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
    path: 'admin',
    component: AdminPage,
    title: "Panel",
    canActivate: [adminGuard],
    resolve: {
      picture: adminPictureResolver
    }
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
