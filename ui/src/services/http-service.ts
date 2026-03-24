import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TreeNode} from '../types/tree-node';
import {PicturePreview} from '../types/picture-preview';
import {RegisterUserAccountRequest} from '../types/requests/register-user-account-request';
import {LoginRequest} from '../types/requests/login-request';
import {UploadOptions} from '../types/responses/upload-options';
import {UploadPhotoRequest} from '../types/requests/upload-photo-request';
import {PictureDetails} from '../types/responses/picture-details';

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

  public getUploadOptions(): Observable<UploadOptions> {
    return this.httpClient.get<UploadOptions>(this.apiEndpoint + '/api/upload-options');
  }

  public getPictureDetails(id: number): Observable<PictureDetails> {
    return this.httpClient.get<PictureDetails>(this.apiEndpoint + '/api/picture/' + id);
  }

  public postRegisterUserAccount(request: RegisterUserAccountRequest): Observable<any> {
    return this.httpClient.post<any>(this.apiEndpoint + '/api/account/register', request);
  }

  public postLogin(request: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(this.apiEndpoint + '/api/account/login', request);
  }

  public postUploadPhoto(request: UploadPhotoRequest): Observable<any> {
    const formData = new FormData()
    formData.append("file", request.file, request.file.name);
    formData.append("photoDetails", JSON.stringify(request.photoDetails));

    return this.httpClient.post<any>(this.apiEndpoint + '/api/picture/upload', formData);
  }
}
