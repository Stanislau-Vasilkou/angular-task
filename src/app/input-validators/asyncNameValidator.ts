import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable, of as observableOf} from 'rxjs';

export function asyncNameValidator(): AsyncValidatorFn {
  return  (control: AbstractControl): Observable<ValidationErrors | null > => {
    return observableOf();
  };
}
