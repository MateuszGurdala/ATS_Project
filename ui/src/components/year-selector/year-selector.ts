import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-year-selector',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './year-selector.html',
  styleUrl: './year-selector.css',
})
export class YearSelector implements OnInit {
  public readonly maxYear: WritableSignal<number> = signal<number>(0);
  public readonly minYear: WritableSignal<number> = signal<number>(0);
  public readonly selectedYear: WritableSignal<number> = signal<number>(0);

  private years: number[] = [2016, 2017, 2018, 2019, 2020, 2023, 2024, 2025];
  private yearIndex: number = 0;

  ngOnInit(): void {
    this.maxYear.set(this.years[this.years.length - 1]);
    this.minYear.set(this.years[0]);
    this.setMinYear();
  }

  public onYearChange(direction: "next" | "prev"): void {
    switch (direction) {
      case "next":
        this.yearIndex++;
        this.yearIndex >= this.years.length ? this.yearIndex-- : this.yearIndex;
        break;
      case "prev":
        this.yearIndex--;
        this.yearIndex < 0 ? this.yearIndex++ : this.yearIndex;
        break;
    }
    this.selectedYear.set(this.years[this.yearIndex]);
  }

  public onSelectedMaxYear(): void {
    this.setMaxYear();
  }

  public onSelectedMinYear(): void {
    this.setMinYear();
  }

  private setMinYear(): void {
    this.yearIndex = 0;
    this.selectedYear.set(this.years[this.yearIndex]);
  }
  private setMaxYear(): void {
    this.yearIndex = this.years.length - 1;
    this.selectedYear.set(this.years[this.yearIndex]);
  }
}
