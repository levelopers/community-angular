import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";
import {UserService} from "../../shared/services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {compareObjects} from "../../shared/utils/compareObjects";

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  public user: User;
  public RequestStatusEnum: any = Object.assign({}, RequestStatusEnum);
  public updateSettingsStatus: RequestStatusEnum;
  private originalUser: User = new User();

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
        Object.assign(this.originalUser, user);
        this.user = user;
      }
    );
  }

  public isUserChanged() {
    return !compareObjects(this.user, this.originalUser);
  }

  public updateSettings() {
    this.updateSettingsStatus = RequestStatusEnum.LOADING;
    this.userService.updateCurrentUser(this.user)
      .pipe(catchError(err => {
        this.updateSettingsStatus = RequestStatusEnum.FAIL;
        return throwError(err);
      })).subscribe(res => {
      if (!!res) {
        this.updateSettingsStatus = RequestStatusEnum.SUCCESS;
        setTimeout(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        }, 1500)
      }
    });
  }
}
