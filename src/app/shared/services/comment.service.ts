import {Injectable} from '@angular/core';
import {CommentModel} from "../models/CommentModel";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rootUrl} from "../../configs/api-config";
import {delay, map} from "rxjs/operators";
import {APIResponse} from "../models/APIResponse";
import {COMMENTDTOS, COMMENTS} from "../_fakeData";
import {CreateCommentModel} from "../models/CreateCommentModel";
import {CommentDTOModel} from "../models/CommentDTOModel";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentAPI = "/comment";

  constructor(private http: HttpClient) {
  }

  public postComment(comment: CreateCommentModel): Observable<CommentModel> {
    console.log(`postComment: ${JSON.stringify(comment)}`);
    return this.http.post<APIResponse>(rootUrl + this.commentAPI, comment).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    );
    // return of(COMMENTS[0]).pipe(delay(1000));
  }

  public getSubComments(commentId: number): Observable<CommentDTOModel[]> {
    return this.http.get<APIResponse>(rootUrl + this.commentAPI + '/' + commentId).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
    // return of(COMMENTDTOS);
  }

  public incCommentLikeCount(commentId: number): Observable<any> {
    return this.http.post<APIResponse>(rootUrl + this.commentAPI + '/' + commentId + '/' + "like", null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }

  public decCommentLikeCount(commentId: number): Observable<any> {
    return this.http.post<APIResponse>(rootUrl + this.commentAPI + '/' + commentId + '/' + "dislike", null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }
}
