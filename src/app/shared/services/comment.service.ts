import {Injectable} from '@angular/core';
import {CommentModel} from "../models/CommentModel";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rootUrl} from "../../configs/api-config";
import {map} from "rxjs/operators";
import {APIResponse} from "../models/APIResponse";
import {COMMENTS} from "../_fakeData";
import {CreateCommentModel} from "../models/CreateCommentModel";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentAPI = "/comment";

  constructor(private http: HttpClient) {
  }

  public postComment(comment: CreateCommentModel): Observable<CommentModel> {
    // return this.http.post<APIResponse>(rootUrl + this.commentAPI, comment).pipe(
    //   map((res: APIResponse) => {
    //     return res?.data;
    //   })
    // )
   return of(COMMENTS[0]);
  }
}
