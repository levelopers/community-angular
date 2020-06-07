import {Injectable} from '@angular/core';
import {delay, map} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rootUrl} from "../../configs/api-config";
import {APIResponse} from "../models/APIResponse";
import {AuthService} from "./auth.service";
import {User} from "../models/User";
import {USER} from "../_fakeData";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUserSubject: Subject<User> = new Subject<User>();
  public currentUserObservable: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  login(loginForm): Observable<APIResponse> {
    const loginUrl = `${rootUrl}/users/login`;
    return this.http.post<APIResponse>(loginUrl, loginForm).pipe(
      map(res => {
        if (res && res.data && res.data.token) {
          this.authService.setToken(res.data.token);
        }
        return res;
      }),
      // catchError(this.handleError('Login Failed', null))
    );
  }

  logout() {
    this.authService.removeToken();
    this.currentUserSubject.next(null);
  }

  signUp(user: User): Observable<User> {
    console.log("signup: " + JSON.stringify(user));
    const url = `${rootUrl}/users/signup`;
    return this.http.post<APIResponse>(url, user).pipe(
      map(res => {
        console.log("signup: " + JSON.stringify(res));
        return res.data;
      })
    );
    // return of(USER).pipe(delay(2000));
  }

  getCurrentUser(): Observable<User> {
    const GET_USER_URL = `${rootUrl}/user`;
   return this.http.get<APIResponse>(GET_USER_URL).pipe(
     map(res => {
       this.currentUserSubject.next(res.data);
       return res.data;
     })
   )
   //  return of(USER);
  }

  updateCurrentUser(user: User): Observable<User> {
    console.log("updateCurrentUser: " + JSON.stringify(user));
    const PUT_USER_URL = `${rootUrl}/user`;
    return this.http.put<APIResponse>(PUT_USER_URL,user).pipe(
      map(res => {
        return res.data;
      })
    )
    // return of(USER);
  }
}
