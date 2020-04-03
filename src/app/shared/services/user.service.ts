import {Injectable} from '@angular/core';
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {rootUrl} from "../../configs/api-config";
import {APIResponse} from "../models/APIResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
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
}
