import {inject, Injectable} from '@angular/core';
import {HttpService} from './http-service';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly httpService: HttpService = inject(HttpService);

  public registerUserAccount(username: string, password: string): Observable<any> {
    return this.httpService.postRegisterUserAccount({
      userName: username,
      password: password
    })
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
