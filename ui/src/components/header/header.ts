import {Component, inject, signal, WritableSignal} from '@angular/core';
import {Location} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';
import {ThemeService} from '../../services/theme-service';
import {UserAccountService} from '../../services/user-account-service';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly location: Location = inject(Location);
  private readonly router: Router = inject(Router);

  public readonly userAccountService: UserAccountService = inject(UserAccountService);
  public readonly themeService: ThemeService = inject(ThemeService);
  public readonly showLoginButton: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showAddPictureButton: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    this.location.onUrlChange((url: string) => {
      this.showLoginButton.set(url != "/login" && !this.userAccountService.isAuthenticated.value)
      this.showAddPictureButton.set(url != "/upload" && this.userAccountService.isAuthenticated.value)
    })

    this.userAccountService.isAuthenticated.subscribe((isAuthenticated: boolean): void => {
      this.showLoginButton.set(this.location.path() != "/login" && !isAuthenticated)
      this.showLoginButton.set(this.location.path() != "/upload" && isAuthenticated)
    })
  }

  public onLogOut(): void {
    this.userAccountService.logout()
    this.showLoginButton.set(true)
    this.router.navigate(["/main"]);
  }

  public onChangeTheme(): void {
    this.themeService.switchTheme()
  }
}
