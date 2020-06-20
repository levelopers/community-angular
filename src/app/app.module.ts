import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {PagesModule} from "./pages/pages.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt-interceptor.service";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ErrorInterceptor} from "./interceptors/error-interceptor.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionPageComponent} from "./pages/question-page/question-page.component";
import {PublishPageComponent} from "./pages/publish-page/publish-page.component";
import {SettingPageComponent} from "./pages/setting-page/setting-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'questions/:id', component: QuestionPageComponent},
  {path: 'publish', component: PublishPageComponent},
  {path: 'setting', component: SettingPageComponent},
  {path: 'profile', component: ProfilePageComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    SharedModule,
    PagesModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
