import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rootUrl} from '../../configs/api-config'
import {Observable, of} from "rxjs";
import {Question} from "../models/Question";
import {map} from "rxjs/operators";
import {APIResponse} from "../models/APIResponse";
import {QUESTIONS} from "../_fakeData";
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionAPI = "/questions";
  constructor(private http: HttpClient) { }

  get questions(): Observable<Question[]> {
    // return this.http.get<APIResponse>(rootUrl + this.questionAPI).pipe(
    //   map((res: APIResponse) => {
    //     console.log(JSON.stringify(res.data))
    //     return res.data;
    //   })
    // )
    return of(QUESTIONS);
  }
}
