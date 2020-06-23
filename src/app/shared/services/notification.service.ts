import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {rootUrl} from "../../configs/api-config";
import {APIResponse} from "../models/APIResponse";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import '../../../assets/socketjs.min'
import '../../../assets/stomp.min'

declare var Stomp;
declare var SockJS;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  initializeWebSocketConnection(onConnected) {
    var socket = new SockJS(rootUrl + '/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected);
    return stompClient;
  }

  public makeComment(questionId: number): Observable<any> {
    const makeCommentUrl = rootUrl + "/makeComment" + '/' + questionId;
    return this.http.post<APIResponse>(makeCommentUrl, null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    );
  }
}
