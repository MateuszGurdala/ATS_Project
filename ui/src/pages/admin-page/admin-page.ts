import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe} from '@angular/common';
import {HttpService} from '../../services/http-service';
import {AdminPanelPicture} from '../../components/admin-panel-picture/admin-panel-picture';

@Component({
  selector: 'app-admin-page',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    AdminPanelPicture,
  ],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  public readonly httpService: HttpService = inject(HttpService);
}
