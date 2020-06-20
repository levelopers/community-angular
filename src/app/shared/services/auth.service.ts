import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenSuject: Subject<string> = new Subject<string>();
  public tokenObservable: Observable<string> = this.tokenSuject.asObservable();

  constructor(private cookieService: CookieService) {
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public setToken(token: string): void {
    this.cookieService.set('token', token);
    this.tokenSuject.next(token);
  }

  public removeToken(): void {
    this.cookieService.delete('token');
    this.tokenSuject.next(null);
  }
}
