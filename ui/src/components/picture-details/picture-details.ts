import {AsyncPipe, Location} from '@angular/common';
import {Component, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpService} from '../../services/http-service';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {PhotoDetails} from '../../types/requests/upload-photo-request';
import {UploadService} from '../../services/upload-service';
import {UserAccountService} from '../../services/user-account-service';

@Component({
  selector: 'app-picture-details',
  imports: [
    MatIconButton,
    MatIcon,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFabButton,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatError,
    MatOption,
    MatSelect
  ],
  templateUrl: './picture-details.html',
  styleUrl: './picture-details.css',
})
export class PictureDetails {
  public pictureId: InputSignal<number> = input(0);

  private readonly location: Location = inject(Location);
  private readonly httpService: HttpService = inject(HttpService);
  public readonly uploadService: UploadService = inject(UploadService)
  public readonly userAccountService: UserAccountService = inject(UserAccountService)

  public readonly editMode: WritableSignal<"edit" | "save"> = signal("edit")
  public readonly isReadonly: WritableSignal<boolean> = signal(true)

  private detailsCopy: PhotoDetails | null = null;

  public readonly detailsForm: FormGroup = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'year': new FormControl(null, [Validators.required, Validators.min(1980), Validators.max(new Date().getFullYear())]),
    'area': new FormControl('', [Validators.required]),
    'parentArea': new FormControl('', [Validators.required]),
    'description': new FormControl('', []),
    'createdOn': new FormControl('',),
    'createdBy': new FormControl('',),
    'updatedOn': new FormControl('',),
    'updatedBy': new FormControl('',),
  })

  constructor() {
    this.httpService.pictureDetailsDataSource.subscribe((data) => this.detailsForm.setValue(data));
  }

  public onGoBack(): void {
    this.location.back()
  }

  public onStartEdit(): void {
    this.isReadonly.set(false);
    this.detailsCopy = JSON.parse(JSON.stringify(this.detailsForm.value));
    this.editMode.set("save");
  }

  public onStopEdit(): void {
    if (!this.hasFormChanged())
      this.detailsForm.setValue(this.detailsCopy!)

    this.isReadonly.set(true);
    this.editMode.set("edit");
    this.detailsCopy = null;
  }

  public onSave(): void {
    this.isReadonly.set(true);
    this.editMode.set("edit");

    if (this.hasFormChanged()) {
      this.uploadService.updatePhotoDetails(this.pictureId(), this.detailsForm.value);
    }
    this.detailsCopy = null;
  }

  private hasFormChanged(): boolean {
    return this.detailsCopy?.area != this.detailsForm.value.area ||
      this.detailsCopy?.title != this.detailsForm.value.title ||
      this.detailsCopy?.year != this.detailsForm.value.year ||
      this.detailsCopy?.parentArea != this.detailsForm.value.parentArea ||
      this.detailsCopy?.description != this.detailsForm.value.description;
  }
}
