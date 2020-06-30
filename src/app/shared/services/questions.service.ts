import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rootUrl} from '../../configs/api-config'
import {Observable} from "rxjs";
import {Question} from "../models/Question";
import {map} from "rxjs/operators";
import {APIResponse} from "../models/APIResponse";
import {CommentModel} from "../models/CommentModel";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionAPI = "/questions";

  constructor(private http: HttpClient) {
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<APIResponse>(rootUrl + this.questionAPI).pipe(
      map((res: APIResponse) => {
        return res.data;
      })
    )
  }

  public getQuestionByQuestionId(id: number): Observable<Question> {
    return this.http.get(rootUrl + this.questionAPI + '/' + id).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }

  public getCommentsByQuestionId(id: number): Observable<CommentModel[]> {
    return this.http.get<APIResponse>(rootUrl + this.questionAPI + '/' + id + '/' + 'comments').pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }

  public postQuestion(question: Question): Observable<Question> {
    const postQuestionAPI = "/publish";
    return this.http.post<APIResponse>(rootUrl + postQuestionAPI, question).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    );
  }

  public getCurrentUserQuestions(): Observable<Question[]> {
    const GET_CURRENT_USER_QUESTIONS_URL = "/profile/questions";
    return this.http.get<APIResponse>(rootUrl + GET_CURRENT_USER_QUESTIONS_URL).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    );
  }
}
