import {Component, inject} from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserAccountService} from '../../services/user-account-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  imports: [
    MatLabel,
    MatFormField,
    MatIcon,
    MatInput,
    MatFabButton,
    FormsModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly title: Title = inject(Title)
  private readonly userAccountService: UserAccountService = inject(UserAccountService)
  private readonly toastrService: ToastrService = inject(ToastrService)

  public readonly loginFrom: FormGroup = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
  })

  public readonly registerForm: FormGroup = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8), this.userAccountService.containsDigitValidator()]),
    'passwordRepeat': new FormControl('', [Validators.required])
  }, {
    validators: [this.userAccountService.passwordsAreEqualValidator()]
  })

  constructor() {
    this.title.setTitle("Zaloguj się")
  }

  public onLogin(): void {
  }

  public onRegister(): void {
    this.userAccountService.registerUserAccount(
      this.registerForm.controls['username'].value,
      this.registerForm.controls['password'].value
    ).subscribe({
      next: () => {
        this.toastrService.success("Konto założono pomyślnie", "Sukces");
        ['username', 'password'].forEach((controlName: string): void => {
          this.loginFrom.controls[controlName].setValue(this.registerForm.controls[controlName].value);
        });
        this.registerForm.reset();
      },
      error: () => {
        this.registerForm.controls['username'].setErrors({duplicate: true});
      }
    })
  }
}
