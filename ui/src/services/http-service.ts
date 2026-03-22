import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TreeNode} from '../types/tree-node';
import {PicturePreview} from '../types/picture-preview';
import {RegisterUserAccountRequest} from '../types/register-user-account-request';

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

  public getPictures(params?: HttpParams): Observable<PicturePreview[]> {
    return this.httpClient.get<PicturePreview[]>(this.apiEndpoint + '/api/pictures', {params: params});
  }

  public postRegisterUserAccount(request: RegisterUserAccountRequest): Observable<any> {
    return this.httpClient.post<any>(this.apiEndpoint + '/api/account/register', request);
  }
}
