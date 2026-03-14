import { Component } from '@angular/core';
import {YearSelector} from '../year-selector/year-selector';
import {AreaSelector} from '../area-selector/area-selector';

@Component({
  selector: 'app-browser-panel',
  imports: [
    YearSelector,
    AreaSelector
  ],
  templateUrl: './browser-panel.html',
  styleUrl: './browser-panel.css',
})
export class BrowserPanel {}
