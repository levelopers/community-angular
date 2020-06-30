import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rootUrl} from "../../configs/api-config";
import {map} from "rxjs/operators";
import {APIResponse} from "../models/APIResponse";
import {CreateCommentModel} from "../models/CreateCommentModel";
import {CommentModel} from "../models/CommentModel";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentAPI = "/comments";

  constructor(private http: HttpClient) {
  }

  public postComment(comment: CreateCommentModel): Observable<CommentModel> {
    const POST_COMMENT_URL = rootUrl + "/comment";
    return this.http.post<APIResponse>(POST_COMMENT_URL, comment).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    );
  }

  public getSubComments(commentId: number): Observable<CommentModel[]> {
    const GET_SUB_COMMENTS_URL = rootUrl + this.commentAPI + '/' + commentId;
    return this.http.get<APIResponse>(GET_SUB_COMMENTS_URL).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }

  public incCommentLikeCount(commentId: number): Observable<any> {
    const INC_COMMENT_LIKE_COUNT_URL = rootUrl + this.commentAPI + '/' + commentId + '/' + "like";
    return this.http.post<APIResponse>(INC_COMMENT_LIKE_COUNT_URL, null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }

  public decCommentLikeCount(commentId: number): Observable<any> {
    const DEC_COMMENT_LIKE_COUNT_URL = rootUrl + this.commentAPI + '/' + commentId + '/' + "dislike";
    return this.http.post<APIResponse>(DEC_COMMENT_LIKE_COUNT_URL, null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }
}
