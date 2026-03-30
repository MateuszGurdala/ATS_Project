import {AdminPhotoDetails} from '../../types/responses/admin-photo-details';
import {Component, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {Config} from '../../app/config';

@Component({
  selector: 'app-admin-panel-picture',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './admin-panel-picture.html',
  styleUrl: './admin-panel-picture.css',
})
export class AdminPanelPicture implements OnInit{
  protected readonly Config: typeof Config = Config;

  public adminPictureDetails = input<AdminPhotoDetails>()

  public readonly details = new FormGroup({
    "area": new FormControl(""),
    "description": new FormControl(""),
    "extension": new FormControl(""),
    "id": new FormControl(""),
    "parentArea": new FormControl(""),
    "title": new FormControl(""),
    "updatedBy": new FormControl(""),
    "updatedOn": new FormControl(""),
    "year": new FormControl(""),
  })

  ngOnInit(): void {
    this.details.setValue(<any>this.adminPictureDetails());
  }

}
