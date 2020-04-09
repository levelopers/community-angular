import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/User";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  public user: User;
  public RequestStatusEnum: any = Object.assign({},RequestStatusEnum);
  public updateSettingsStatus: RequestStatusEnum;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

  public updateSettings() {
    this.updateSettingsStatus = RequestStatusEnum.LOADING;
    this.userService.updateCurrentUser(this.user).subscribe(res => {
      if(res) {
        this.updateSettingsStatus = RequestStatusEnum.SUCCESS;
      }
      this.updateSettingsStatus = RequestStatusEnum.FAIL;
    });
  }
}
