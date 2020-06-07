import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./home-page/home-page.component";
import {SharedModule} from "../shared/shared.module";
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import { QuestionPageComponent } from './question-page/question-page.component';
import {MatListModule} from "@angular/material/list";
import {FlexModule} from "@angular/flex-layout/typings/flex";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import { QuestionCommentComponent } from './question-page/components/question-comment/question-comment.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import { PublishPageComponent } from './publish-page/publish-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
// import { UploadImageComponent } from './setting-page/components/upload-image/upload-image.component';



@NgModule({
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    QuestionPageComponent,
    QuestionCommentComponent,
    PublishPageComponent,
    SettingPageComponent,
    ProfilePageComponent,
    SignupPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    MatListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    HomePageComponent,
    LoginPageComponent
  ]
})
export class PagesModule { }
