import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {rootUrl} from "../../configs/api-config";
import {APIResponse} from "../models/APIResponse";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import '../../../assets/socketjs.min'
import '../../../assets/stomp.min'
import {NotificationModel} from "../models/NotificationModel";

declare var Stomp;
declare var SockJS;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationsSubject: Subject<NotificationModel[]> = new Subject<NotificationModel[]>();
  public notificationsObservable: Observable<NotificationModel[]> = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  initializeWebSocketConnection(onConnected) {
    var socket = new SockJS(rootUrl + '/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected);
    return stompClient;
  }

  public makeComment(questionId: number): Observable<any> {
    const makeCommentUrl = rootUrl + "/ws" + "/makeComment" + '/' + questionId;
    return this.http.post<APIResponse>(makeCommentUrl, null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    );
  }

  public getNotifications(): Observable<NotificationModel[]> {
    const GET_NOTIFICATIONS_URL = rootUrl + "/notifications";
    return this.http.get(GET_NOTIFICATIONS_URL).pipe(
      map((res: APIResponse) => {
        this.notificationsSubject.next(res.data);
        return res?.data;
      })
    )
  }

  public readNotification(id: number): Observable<any> {
    const POST_READ_NOTIFICATIONS_URL = rootUrl + "/notifications/" + id + "/read";
    return this.http.post(POST_READ_NOTIFICATIONS_URL, null).pipe(
      map((res: APIResponse) => {
        return res?.data;
      })
    )
  }
}
