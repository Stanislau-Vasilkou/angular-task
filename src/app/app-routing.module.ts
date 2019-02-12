import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormEditorComponent} from "./auth-user-page/form-editor/form-editor.component";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthUserPageComponent} from "./auth-user-page/auth-user-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {UserInfoComponent} from "./auth-user-page/user-info/user-info.component";

const routes: Routes = [
  { path: 'users',
    component: AuthUserPageComponent,
    canActivate: [AuthGuard]
  },

  { path: 'login',
    component: LoginComponent
  },

  { path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard]
  },

  { path: '',
    redirectTo: 'login',
    pathMatch : 'full'
  },

  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
