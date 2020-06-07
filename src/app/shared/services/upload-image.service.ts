// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {rootUrl} from "../../configs/api-config";
// import {Observable} from "rxjs";
// import {map} from "rxjs/operators";
// import {APIResponse} from "../models/APIResponse";
// // import {BROWSER_SANITIZATION_PROVIDERS, ɵDomSanitizerImpl} from '@angular/platform-browser';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UploadImageService {
//   private uploadImageUrlRoot = "/user/upload";
//
//   constructor(private http: HttpClient) {
//   }
//
//   onUpload(imageFile): Observable<any> {
//
//     let uploadImageData = new FormData();
//     uploadImageData.append('imageFile', imageFile);
//     let headers = new Headers();
//     headers.append('Content-Type', 'multipart/form-data');
//     headers.append('Accept', 'application/json');
//    return this.http.post<any>(rootUrl + this.uploadImageUrlRoot, uploadImageData)
//      .pipe(
//        map((res:APIResponse) => {
//          console.log('upload' + JSON.stringify(res));
//          return res?.data;
//        })
//      )
//   }
//
//   // Gets called when the user clicks on retieve image button to get the image from back end
//   getImage(): Observable<any> {
//     //Make a call to Sprinf Boot to get the Image Bytes.
//     return this.http.get<APIResponse>(rootUrl + "/user/image")
//       .pipe(map(
//         res => {
//           const retrieveResonse = res.data;
//            return 'data:image/jpeg;base64,' + retrieveResonse;
//         })
//       );
//   }
// }
