import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  public signupForm: FormGroup;
  public RequestStatusEnum: any = Object.assign({}, RequestStatusEnum);
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
    if (this.signupForm.valid) {
      this.signupStatus = RequestStatusEnum.LOADING;
      this.userService.signUp(this.signupForm.value)
        .pipe(catchError(err => {
          this.signupStatus = RequestStatusEnum.FAIL;
          return throwError(err);
        })).subscribe(res => {
        if (!!res) {
          this.router.navigate(['/login']);
          this.signupStatus = RequestStatusEnum.SUCCESS;
        }
      })
    }
  }
}
