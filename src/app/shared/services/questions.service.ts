import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rootUrl} from '../../configs/api-config'
import {Observable, of} from "rxjs";
import {Question} from "../models/Question";
import {map} from "rxjs/operators";
import {APIResponse} from "../models/APIResponse";
import {COMMENTDTOS, QUESTIONS} from "../_fakeData";
import {CommentModel} from "../models/CommentModel";
import {CommentDTOModel} from "../models/CommentDTOModel";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionAPI = "/questions";

  constructor(private http: HttpClient) {
  }

  getQuestions(): Observable<Question[]> {
    // return this.http.get<APIResponse>(rootUrl + this.questionAPI).pipe(
    //   map((res: APIResponse) => {
    //     console.log(JSON.stringify(res.data))
    //     return res.data;
    //   })
    // )
    return of(QUESTIONS);
  }

  public getQuestionByQuestionId(id: number): Observable<Question> {
    // return this.http.get(`${this.questionAPI}/${id}`).pipe(
    //    map((res:APIResponse) => {
    //      return res?.data;
    //    })
    //  )
    return of(QUESTIONS[0])
  }

  public getCommentsByQuestionId(id: number): Observable<CommentDTOModel[]> {
    // return this.http.get<APIResponse>(`${this.questionAPI}/${id}/comments`).pipe(
    //   map((res: APIResponse) => {
    //     return res?.data;
    //   })
    // )
    return of(COMMENTDTOS);
  }

}
