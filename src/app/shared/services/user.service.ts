import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rootUrl} from "../../configs/api-config";
import {APIResponse} from "../models/APIResponse";
import {AuthService} from "./auth.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User;
  public currentUserSubject: Subject<User> = new Subject<User>();
  public currentUserObservable: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  login(loginForm): Observable<APIResponse> {
    const loginUrl = `${rootUrl}/users/login`;
    return this.http.post<APIResponse>(loginUrl, loginForm).pipe(
      map(res => {
        if (!!res && !!res.data && !!res.data.token) {
          this.authService.setAuth({
            username: res.data.username,
            token: res.data.token
          });
        }
        return res;
      }),
    );
  }

  logout() {
    this.authService.removeAuth();
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }

  signUp(user: User): Observable<User> {
    const url = `${rootUrl}/users/signup`;
    return this.http.post<APIResponse>(url, user).pipe(
      map(res => {
        return res.data;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const GET_USER_URL = `${rootUrl}/user`;
    return this.http.get<APIResponse>(GET_USER_URL).pipe(
      map(res => {
        this.currentUserSubject.next(res.data);
        this.currentUser = res.data;
        return res.data;
      })
    )
  }

  updateCurrentUser(user: User): Observable<User> {
    const PUT_USER_URL = `${rootUrl}/user`;
    return this.http.post<APIResponse>(PUT_USER_URL, user).pipe(
      map(res => {
        return res.data;
      })
    )
  }
}
