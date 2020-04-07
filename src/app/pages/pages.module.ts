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



@NgModule({
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    QuestionPageComponent,
    QuestionCommentComponent,
    PublishPageComponent
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

  ],
  exports: [
    HomePageComponent,
    LoginPageComponent
  ]
})
export class PagesModule { }
