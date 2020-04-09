import {Injectable} from '@angular/core';
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {rootUrl} from "../../configs/api-config";
import {APIResponse} from "../models/APIResponse";
import {AuthService} from "./auth.service";
import {root} from "rxjs/internal-compatibility";
import {User} from "../models/User";
import {USER} from "../_fakeData";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private authService: AuthService) {
  }

  login(loginForm): Observable<APIResponse> {
    const loginUrl = `${rootUrl}/users/login`;
    return this.http.post<APIResponse>(loginUrl, loginForm).pipe(
      map(res => {
        if (res && res.data && res.data.token) {
          this.cookieService.set('token', res.data.token);
        }
        return res;
      }),
      // catchError(this.handleError('Login Failed', null))
    );
  }

  logout() {
    this.cookieService.delete('token');
  }
  //
  // signUp(user: User): Observable<User> {
  //   const url = `${apiUrl}/register`;
  //   return this.http.post<User>(url, user);
  // }

  getCurrentUser(): Observable<User> {
    const GET_USER_URL = `${rootUrl}/user`;
   // return this.http.get<APIResponse>(GET_USER_URL).pipe(
   //   map(res => {
   //     return res.data;
   //   })
   // )
    return of(USER);
  }

  updateCurrentUser(user: User): Observable<User> {
    console.log("updateCurrentUser: " + JSON.stringify(user));
    const PUT_USER_URL = `${rootUrl}/user`;
    // return this.http.put<APIResponse>(PUT_USER_URL,user).pipe(
    //   map(res => {
    //     return res.data;
    //   })
    // )
    return of(USER);
  }
}
