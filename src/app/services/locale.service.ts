import { Injectable } from '@angular/core';
import * as moment from "moment";
import {TranslateService} from "@ngx-translate/core";

export let currentLanguage: string = 'en';

@Injectable({
  providedIn: 'root'
})

export class LocaleService {

  constructor(private translate: TranslateService) {
  }

  setLocale(value) {
    moment.locale(currentLanguage);
    return moment(value).format('DD MMMM YYYY');
  }

  switchLanguage(value) {
    currentLanguage = value;
    this.translate.use(currentLanguage);
    return currentLanguage;
  }
}
