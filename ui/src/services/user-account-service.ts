import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from './http-service';
import {Router} from '@angular/router';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router = inject(Router);

  public readonly isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private token: {} | null = null;

  constructor() {
    const storageToken = localStorage.getItem("token")

    if (!!storageToken) {
      this.token = storageToken;
      this.isAuthenticated.next(true);
    }
  }

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
    localStorage.setItem("token", JSON.stringify(token))
    this.isAuthenticated.next(true);
    this.router.navigate(["/main"])
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem("token");
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
