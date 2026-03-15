import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TreeNode} from '../types/tree-node';
import {BehaviorSubject, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  private availableYears: number[] = [];
  private availableAreas: { [p: number]: TreeNode[] } = {};

  public readonly selectedYear: WritableSignal<number> = signal<number>(0);
  public readonly maxYear: WritableSignal<number> = signal<number>(0);
  public readonly minYear: WritableSignal<number> = signal<number>(0);
  public areaDataSource: Subject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);

  public reset(): void {
    this.selectedYear.set(this.availableYears[0]);
    this.minYear.set(this.availableYears[0]);
    this.maxYear.set(this.availableYears[this.availableYears.length - 1]);
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
  }

  public setQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        year: this.selectedYear()
      },
      queryParamsHandling: 'merge'
    });
  }

  public setAvailableAreas(areas: { [p: number]: TreeNode[] }): void {
    this.availableAreas = areas;
  }

  public setAvailableYears(years: number[]): void {
    this.availableYears = years;
  }

  public setYearToMin(): void {
    this.selectedYear.set(this.minYear());
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
  }

  public setYearToMax(): void {
    this.selectedYear.set(this.maxYear());
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
  }

  public changeYear(change: "next" | "prev"): void {
    let selectedYearIndex = this.availableYears.indexOf(this.selectedYear());
    switch (change) {
      case "next":
        selectedYearIndex++;
        selectedYearIndex >= this.availableYears.length ? selectedYearIndex-- : selectedYearIndex;
        break;
      case "prev":
        selectedYearIndex--;
        selectedYearIndex < 0 ? selectedYearIndex++ : selectedYearIndex;
        break;
    }
    this.selectedYear.set(this.availableYears[selectedYearIndex]);
    this.areaDataSource.next(this.availableAreas[selectedYearIndex] ?? [])
    this.setQueryParams()
  }
}
