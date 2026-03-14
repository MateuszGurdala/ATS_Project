import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {YearSelector} from '../components/year-selector/year-selector';
import {MainPage} from '../pages/main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, YearSelector, MainPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ui');
}
