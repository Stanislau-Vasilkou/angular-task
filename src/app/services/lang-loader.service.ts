import { Injectable } from '@angular/core';
import {TranslateLoader} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({KEY: 'value'});
  }
}
