import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";


const users = ["Ivan", "Stan", "Anna", "Gorge"];

function existingName(name: string): Observable<boolean> {
  const exist = users.indexOf(name) >= 0;
  return of(exist).pipe(delay(3000));
}

export function asyncNameValidator(): AsyncValidatorFn {
  return ((control: AbstractControl):  Observable<ValidationErrors | null> => {
    return existingName(control.value).pipe(
      map((exist) => (exist ? { message: "This name is already exist" } : null)),
      catchError(() => null));
  });
}



