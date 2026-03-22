import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {Location} from '@angular/common';
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

  public readonly userAccountService: UserAccountService = inject(UserAccountService);
  public readonly showLoginButton: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    this.location.onUrlChange((url: string) => {
      this.showLoginButton.set(url != "/login" && !this.userAccountService.isAuthenticated.value)
    })

    this.userAccountService.isAuthenticated.subscribe((isAuthenticated: boolean): void => {
      this.showLoginButton.set(this.location.path() != "/login" && !isAuthenticated)
    })
  }

  public onLogOut(): void {
    this.userAccountService.logout()
  }
}
