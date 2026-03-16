import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TreeNode} from '../types/tree-node';
import {BehaviorSubject, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Picture} from '../types/picture';
import {HttpParams} from '@angular/common/http';
import {HttpService} from './http-service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);

  private availableYears: number[] = [];
  private availableAreas: { [p: number]: TreeNode[] } = {};

  // @ts-ignore
  public selectedYear: WritableSignal<number>;
  public readonly maxYear: WritableSignal<number> = signal<number>(0);
  public readonly minYear: WritableSignal<number> = signal<number>(0);
  public readonly pictureDataSource: WritableSignal<Picture[]> = signal<Picture[]>([]);
  public readonly areaDataSource: Subject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);

  constructor() {
    this.selectedYear = signal<number>(+(localStorage.getItem('year') ?? '0'))
  }

  public reset(): void {
    this.setYear(this.selectedYear() == 0 ? this.availableYears[0] : this.selectedYear())
    this.minYear.set(this.availableYears[0]);
    this.maxYear.set(this.availableYears[this.availableYears.length - 1]);
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
  }

  public setAvailableAreas(areas: { [p: number]: TreeNode[] }): void {
    this.availableAreas = areas;
  }

  public setAvailableYears(years: number[]): void {
    this.availableYears = years;
  }

  public setPictures(pictures: Picture[]): void {
    this.pictureDataSource.set(pictures)
  }

  public setYearToMin(): void {
    this.setYear(this.minYear());
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
    this.loadPictures()
  }

  public setYearToMax(): void {
    this.setYear(this.maxYear())
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
    this.loadPictures()
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
    this.setYear(this.availableYears[selectedYearIndex]);
    this.areaDataSource.next(this.availableAreas[this.selectedYear()] ?? [])
    this.loadPictures()
  }

  public loadPictures(): void {
    this.httpService.getPictures(new HttpParams().set("year", this.selectedYear())).subscribe((pictures) => {
      this.setPictures(pictures);
    });
  }

  private setYear(year: number): void {
    this.selectedYear.set(year);
    localStorage.setItem('year', String(this.selectedYear()))

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        year: this.selectedYear()
      },
      queryParamsHandling: 'merge'
    });
  }
}
