import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "./shared/services/notification.service";
import {AuthService} from "./shared/services/auth.service";
import {AuthModel} from "./shared/models/AuthModel";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private stompClient;

  constructor(private notificationService: NotificationService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (!!this.authService.hasAuth()) {
      const auth = this.authService.getAuth();
      this.subscribeNotification(auth.username);
    }
    this.authService.authObservable.subscribe((auth: AuthModel) => {
      if (!auth) {
        this.stompClient.disconnect();
      } else {
        this.subscribeNotification(auth.username);
      }
    })
  }

  private subscribeNotification(username) {
    this.stompClient = this.notificationService.initializeWebSocketConnection(() => {
      this.stompClient.subscribe(`/user/${username}/queue/notify`, (message) => {
        const displayMessage = JSON.parse(message.body).message;
        this._snackBar.open(displayMessage, "X", {
          duration: 5 * 1000,
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }
}
