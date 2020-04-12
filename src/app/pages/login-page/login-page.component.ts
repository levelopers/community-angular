import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public RequestStatusEnum: any = Object.assign({},RequestStatusEnum);
  public loginStatus: RequestStatusEnum;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.loginStatus = RequestStatusEnum.LOADING;
      this.userService.login(this.loginForm.value).subscribe(res => {
        if (!!res) {
          this.userService.getCurrentUser().subscribe();
          this.router.navigate(['/']);
          this.loginStatus = RequestStatusEnum.SUCCESS;
        }
        this.loginStatus = RequestStatusEnum.FAIL;
      })
    }
  }
}
