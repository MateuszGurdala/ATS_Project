import {HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {HttpHandlerFn} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {UserAccountService} from '../services/user-account-service';
import {inject} from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const userAccountService: UserAccountService = inject(UserAccountService)

  return userAccountService.isAuthenticated.value
    ? next(req.clone({headers: req.headers.append('Authorization', localStorage.getItem("token")!),}))
    : next(req);
}
