import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rootUrl} from '../../configs/api-config'
import {Observable} from "rxjs";
import {Question} from "../models/Question";
import {map} from "rxjs/operators";
import {APIResponse} from "../models/response";
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionAPI = "/questions";
  constructor(private http: HttpClient) { }

  get questions(): Observable<Question[]> {
    return this.http.get<APIResponse>(rootUrl + this.questionAPI).pipe(
      map((res: APIResponse) => {
        return res.data;
      })
    )
  }
}
