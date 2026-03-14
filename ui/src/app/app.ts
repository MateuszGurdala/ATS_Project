import { Component, signal } from '@angular/core';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {MainPage} from '../pages/main-page/main-page';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, MainPage, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ui');
}
