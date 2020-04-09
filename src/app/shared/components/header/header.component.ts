import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  public logout() {
    this.userService.logout();
  }
}
