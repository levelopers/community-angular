import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Observable, Subject} from "rxjs";
import {AuthModel} from "../models/AuthModel";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authSuject: Subject<AuthModel> = new Subject<AuthModel>();
  public authObservable: Observable<AuthModel> = this.authSuject.asObservable();

  constructor(private cookieService: CookieService) {
  }

  public getAuth(): AuthModel {
    const token = this.cookieService.get('token');
    const username = this.cookieService.get('username');
    return {token, username}
  }

  public setAuth(auth: AuthModel): void {
    this.cookieService.set('token', auth.token);
    this.cookieService.set('username', auth.username);
    this.authSuject.next(auth);
  }

  public removeAuth(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
    this.authSuject.next(null);
  }

  public hasAuth(): boolean {
    return !!this.getAuth().token;
  }
}
