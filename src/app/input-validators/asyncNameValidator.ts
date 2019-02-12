import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, delay, filter, map, tap} from "rxjs/operators";
import {UserService} from "../services/user.service";
import {User} from "../user";


export function asyncNameValidator(userService: UserService): AsyncValidatorFn {
  return ((control: AbstractControl):  Observable<ValidationErrors | null> => {
      return userService.getAllUsers().pipe(
        map((users: User[]) => {
          if(users.filter((user) => user.name === control.value).length === 1) {
            return { existName: true }
          } else {
            return null;
          }
        })
      )
  });
}
