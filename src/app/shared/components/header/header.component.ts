import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/UserModel";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {NotificationModel} from "../../models/NotificationModel";
import {map} from "rxjs/operators";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: Observable<UserModel>;
  public notifications$: Observable<NotificationModel[]>;

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
    this.currentUser = this.userService.currentUserObservable.pipe(map((user: UserModel) => {
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

  notificationRedirect(notification: NotificationModel) {
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
