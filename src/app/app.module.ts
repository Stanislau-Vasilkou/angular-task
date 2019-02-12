import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserInfoComponent } from './auth-user-page/user-info/user-info.component';
import {UserService} from "./services/user.service";
import {FormEditorComponent} from './auth-user-page/form-editor/form-editor.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from "./app-routing.module";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from "./guards/auth.guard";
import {AuthUserPageComponent} from './auth-user-page/auth-user-page.component';
import { SpinnerComponent } from './spinner/spinner.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    FormEditorComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    AuthUserPageComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    UserService,
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
