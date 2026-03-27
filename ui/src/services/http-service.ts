import {BehaviorSubject, filter, Observable, shareReplay, switchMap, tap} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginRequest} from '../types/requests/login-request';
import {PictureDetailsResponse} from '../types/responses/picture-details-response';
import {PicturePreview} from '../types/picture-preview';
import {RegisterUserAccountRequest} from '../types/requests/register-user-account-request';
import {TreeNode} from '../types/tree-node';
import {UpdatePictureRequest} from '../types/requests/update-picture-request';
import {UploadOptions} from '../types/responses/upload-options';
import {UploadPhotoRequest} from '../types/requests/upload-photo-request';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly apiEndpoint: string = 'https://localhost:7057';
  private readonly replayCount: number = 3;

  private readonly yearsSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private readonly optionsSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private readonly areasSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private readonly pictureDetailsSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly picturesSubject: BehaviorSubject<HttpParams | null> = new BehaviorSubject<HttpParams | null>(null);

  public readonly yearsDataSource: Observable<number[]> = this.yearsSubject.pipe(
    switchMap((): Observable<number[]> => this.httpClient.get<number[]>(this.apiEndpoint + '/api/available-years')),
    shareReplay(this.replayCount)
  )

  public readonly optionsDataSource: Observable<UploadOptions> = this.optionsSubject.pipe(
    switchMap((): Observable<UploadOptions> => this.httpClient.get<UploadOptions>(this.apiEndpoint + '/api/upload-options')),
    shareReplay(this.replayCount)
  )

  public readonly areasDataSource: Observable<{ [p: number]: TreeNode[] }> = this.areasSubject.pipe(
    switchMap((): Observable<{ [p: number]: TreeNode[] }> => this.httpClient.get<{ [p: number]: TreeNode[] }>(this.apiEndpoint + '/api/areas')),
    shareReplay(this.replayCount)
  )

  public readonly picturesDataSource: Observable<PicturePreview[]> = this.picturesSubject.pipe(
    filter(val => val !== null),
    switchMap((params: any): Observable<PicturePreview[]> => this.httpClient.get<PicturePreview[]>(this.apiEndpoint + '/api/pictures', {params: params})),
    shareReplay(this.replayCount)
  )

  public readonly pictureDetailsDataSource: Observable<PictureDetailsResponse> = this.pictureDetailsSubject.pipe(
    switchMap((id: any): Observable<PictureDetailsResponse> => this.httpClient.get<PictureDetailsResponse>(this.apiEndpoint + '/api/picture/' + id))
  )

  public getAvailableYears(): void {
    this.yearsSubject.next(true);
  }

  public getUploadOptions(): void {
    this.optionsSubject.next(true);
  }

  public getAreas(): void {
    this.areasSubject.next(true);
  }

  public getPictures(params: HttpParams | null): void {
    if (!!params) this.picturesSubject.next(params);
  }

  public getPictureDetails(id: number): void {
    this.pictureDetailsSubject.next(id);
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

    return this.httpClient.post<any>(
      this.apiEndpoint + '/api/picture/upload',
      formData,
      {headers: new HttpHeaders().append('Authorization', localStorage.getItem("token")!)}
    );
  }

  public putUpdatePhoto(request: UpdatePictureRequest): Observable<any> {
    return this.httpClient.put<any>(
      this.apiEndpoint + '/api/picture/update',
      request,
      {headers: new HttpHeaders().append('Authorization', localStorage.getItem("token")!)}
    );
  }

  public deletePhoto(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.apiEndpoint + '/api/picture/delete/' + id,
      {headers: new HttpHeaders().append('Authorization', localStorage.getItem("token")!)}
    )
  }
}
