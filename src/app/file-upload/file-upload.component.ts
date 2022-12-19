import { Component, OnInit } from '@angular/core';
import { getDownloadURL, UploadResult } from 'firebase/storage';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  // Variable to store shortLink from api response
  furl: string = '';
  uploading: boolean = false; // Flag variable
  file?: File; // Variable to store file

  // Inject service
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.displayFile();
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.uploading = true;
    console.log(this.file);
    this.firebaseService
      .uploadFile('olly.jpg', this.file!)
      .then((res: UploadResult) => {
        console.log('uploadResult -> ', res);
        this.uploading = false; // Flag variable
        this.displayFile();
      });
  }
  displayFile() {
    this.firebaseService.getFileUrl('olly.jpg').then((res: string) => {
      console.log('fileUrl -> ', res);
      this.furl = res;
    });
  }
}
