// import {Component, OnInit} from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {UploadImageService} from "../../../../shared/services/upload-image.service";
// import {rootUrl} from "../../../../configs/api-config";
// import {CookieService} from "ngx-cookie-service";
//
// @Component({
//   selector: 'upload-image',
//   templateUrl: './upload-image.component.html',
//   styleUrls: ['./upload-image.component.css']
// })
// export class UploadImageComponent implements OnInit {
//
//   constructor(private uploadImageService: UploadImageService,
//               private cookieService: CookieService) {
//   }
//
//   ngOnInit(): void {
//   }
//
//   selectedFile: File;
//   retrievedImage: any;
//   base64Data: any;
//   retrieveResonse: any;
//   message: string;
//   imageName: any;
//
//   public onFileChanged(event) {
//     this.selectedFile = event.target.files[0];
//   }
//
//   public addHeaders(args: any) {
//     const token = this.cookieService.get("token");
//
//     args.currentRequest.setRequestHeader('Authorization', `Bearer ${token}`);
//   }
//
//   //Gets called when the user clicks on submit to upload the image
//   onUpload() {
//     this.uploadImageService.onUpload(this.selectedFile).subscribe(res => console.log(res));
//   }
//
//
//   // getImage() {
//   //   this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
//   //     .subscribe(
//   //       res => {
//   //         this.retrieveResonse = res;
//   //         this.base64Data = this.retrieveResonse.picByte;
//   //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
//   //       }
//   //     );
//   // }
//
// }
