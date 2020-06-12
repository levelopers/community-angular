import {Component, OnInit} from '@angular/core';
import {rootUrl} from "../../../../configs/api-config";
import {CookieService} from "ngx-cookie-service";
import {FileUploader} from 'ng2-file-upload';
import {RequestStatusEnum} from "../../../../shared/models/RequestStatus.enum";

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  public uploader: FileUploader;
  public RequestStatusEnum: any = Object.assign({}, RequestStatusEnum);
  public uploadStatus: RequestStatusEnum;

  constructor(
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: rootUrl + '/user/upload',
      allowedFileType: ['image']
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploadStatus = RequestStatusEnum.LOADING
    };
    this.uploader.onErrorItem = () => {
      this.uploadStatus = RequestStatusEnum.FAIL;
    };
    this.uploader.onSuccessItem = () => {
      this.uploadStatus = RequestStatusEnum.SUCCESS
    };
  }

  onUpload() {
    const token = this.cookieService.get("token");
    this.uploader.setOptions({
      headers: [{
        name: 'Authorization',
        value: `Bearer ${token}`
      }]
    });
    this.uploader.uploadAll()
  }

  onFileSelected(files: File[]) {
    this.uploader.clearQueue();
    this.uploader.addToQueue(files);
  }
}
