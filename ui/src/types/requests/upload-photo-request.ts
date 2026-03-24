export interface UploadPhotoRequest {
  file: File;
  photoDetails: PhotoDetails;
}

export interface PhotoDetails {
  title: string;
  year: number;
  area: string;
  parentArea: string;
  description?: string;
}
