import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: Observable<User>;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    const userToken = this.authService.getToken();
    if (!!userToken) {
      this.userService.getCurrentUser().subscribe();
    }
    this.currentUser = this.userService.currentUserObservable;
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
