import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/Notification";
import {map} from "rxjs/operators";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: Observable<User>;
  public notifications$: Observable<Notification[]>;

  constructor(private userService: UserService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!!this.authService.hasAuth()) {
      this.userService.getCurrentUser().subscribe();
      this.notificationService.getNotifications().subscribe();
    }
    this.currentUser = this.userService.currentUserObservable.pipe(map((user: User) => {
      if (!!user) {
        this.notificationService.getNotifications().subscribe();
      }
      return user;
    }));
    this.notifications$ = this.notificationService.notificationsObservable;
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe();
  }

  notificationRedirect(notification: Notification) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigateByUrl(notification.redirectUri);
    if (!notification.isRead) {
      this.notificationService.readNotification(notification.id).subscribe();
    }
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
