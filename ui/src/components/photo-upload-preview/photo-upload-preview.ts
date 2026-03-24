import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {Component, inject, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatFabButton} from '@angular/material/button';
import {UploadService} from '../../services/upload-service';

@Component({
  selector: 'app-photo-upload-preview',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatFabButton
  ],
  templateUrl: './photo-upload-preview.html',
  styleUrl: './photo-upload-preview.css',
})
export class PhotoUploadPreview implements OnInit {
  public readonly uploadService: UploadService = inject(UploadService);

  public file: InputSignal<File | undefined> = input<File>();
  public readonly picturePreview: WritableSignal<string> = signal("");

  public readonly uploadForm: FormGroup = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'year': new FormControl(null, [Validators.required]),
    'area': new FormControl('', [Validators.required]),
    'parentArea': new FormControl('', [Validators.required]),
    'description': new FormControl('', [])
  })

  ngOnInit(): void {
    this.picturePreview.set(URL.createObjectURL(this.file()!))
  }

  public onPhotoUpload(): void {
    this.uploadService.uploadPhoto(this.file()!, this.uploadForm.value);
  }
}
