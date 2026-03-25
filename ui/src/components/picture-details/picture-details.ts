import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-picture-details',
  imports: [
    MatIconButton,
    MatIcon,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './picture-details.html',
  styleUrl: './picture-details.css',
})
export class PictureDetails {
  private readonly location: Location = inject(Location);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public readonly isReadonly: WritableSignal<boolean> = signal(true)

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
    this.activatedRoute.data.subscribe((data: Data) => {
      this.detailsForm.setValue(data['details']);
    })
  }

  public onGoBack(): void {
    this.location.back()
  }
}
