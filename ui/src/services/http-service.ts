import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {TreeNode} from '../types/tree-node';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly apiEndpoint: string = 'https://localhost:7057';

  public getAvailableYears(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.apiEndpoint + '/api/available-years');
  }

  public getAreas(): Observable<{ [p: number]: TreeNode[] }> {
    return this.httpClient.get<{ [p: number]: TreeNode[] }>(this.apiEndpoint + '/api/areas');
  }
}
