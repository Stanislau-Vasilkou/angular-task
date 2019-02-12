import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {myStorage} from "./login/login.component";
import {Router} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {LocaleService} from "./services/locale.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  constructor(private translate: TranslateService,
              public localeService: LocaleService,
              private router: Router,
              private authGuard: AuthGuard
              ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  logout(){
    myStorage.clear();
    this.authGuard.authStatus = false;
    this.router.navigate(['login']);
  }
}
