import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  public signupUserModel: User;
  public signupForm: FormGroup;
  public RequestStatusEnum: any = Object.assign({},RequestStatusEnum);
  public signupStatus: RequestStatusEnum;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.signUp(this.signupUserModel).subscribe();
    if(this.signupForm.valid) {
      this.signupStatus = RequestStatusEnum.LOADING;
      this.userService.signUp(this.signupUserModel).subscribe(res => {
        if (!!res) {
          this.router.navigate(['/login']);
          this.signupStatus = RequestStatusEnum.SUCCESS;
        }
        this.signupStatus = RequestStatusEnum.FAIL;
      })
    }
  }

  upLoadAvatar() {

  }
}
