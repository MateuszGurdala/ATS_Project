import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpService} from './http-service';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router = inject(Router);

  public readonly isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private token: {} | null = null;

  public registerUserAccount(username: string, password: string): Observable<any> {
    return this.httpService.postRegisterUserAccount({
      userName: username,
      password: password
    })
  }

  public tryLogin(username: string, password: string): Observable<any> {
    return this.httpService.postLogin({
      userName: username,
      password: password
    })
  }

  public login(token: {}): void {
    this.token = token;
    this.isAuthenticated.next(true);
    this.router.navigate(["/main"])
  }

  public logout(): void {
    this.token = null;
    this.isAuthenticated.next(false);
  }

  public containsDigitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let hasDigit: boolean = /\d/.test(control.value);
      return hasDigit ? null : {hasNoDigit: {value: control.value}}
    };
  }

  public passwordsAreEqualValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const passwordRepeat = control.get('passwordRepeat');

      const areEqual: boolean = !!password!.value && !!passwordRepeat!.value && password?.value == passwordRepeat?.value;

      if (!passwordRepeat?.hasError("required")) {
        areEqual
          ? passwordRepeat?.setErrors(null)
          : passwordRepeat?.setErrors({
            passwordsAreNotEqual: {}
          })
      }
      return null;
    };
  }
}
