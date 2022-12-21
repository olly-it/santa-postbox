import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { getDownloadURL, UploadResult } from 'firebase/storage';
import { FirebaseService } from '../firebase.service';
import { SearchFormComponent } from '../search-form/search-form.component';

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
  myId: string|null = null;

  // Inject service
  constructor(private firebaseService: FirebaseService, private searchFormComponent:SearchFormComponent) {}

  ngOnInit(): void {
    console.log("file-upload init");
    this.displayFile();
    if (this.searchFormComponent.me) {
      this.myId = this.searchFormComponent.me.id+".jpg";
    } else {
      this.myId = null;
    }
    this.displayFile();
    console.log("file-upload init - myId= ",this.myId);
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    console.log("file-upload onUpload - myId= ",this.myId);
    if (this.myId==null) return;
    this.uploading = true;
    console.log(this.file);
    this.firebaseService
      .uploadFile(this.myId!, this.file!)
      .then((res: UploadResult) => {
        console.log('uploadResult -> ', res);
        this.uploading = false; // Flag variable
        this.displayFile();
      });
  }
  displayFile() {
    console.log("file-upload displayFile - myId= ",this.myId);
    if (this.myId==null) {
      this.furl='';
      return;
    }
    this.firebaseService.getFileUrl(this.myId).then((res: string) => {
      console.log('fileUrl -> ', res);
      this.furl = res;
    }).catch(e =>{
      console.log("not found");
      this.furl='';
    });
  }
}
