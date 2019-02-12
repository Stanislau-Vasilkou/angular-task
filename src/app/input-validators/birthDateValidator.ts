import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";
import {dateFormats} from "./dateFormaValidator";


export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const maxAge: number = 65;
    const minAge: number = 18;
    const inputedValue = control.value;
    const currentDay = moment();
    const birthday = moment(inputedValue, dateFormats, true);
    return (currentDay.diff(birthday, 'd') <= 0) ? {fromFuture: true}
           : (currentDay.diff(birthday, 'y') > maxAge)  ? {isOld: true}
           : (currentDay.diff(birthday, 'y') < minAge && currentDay.diff(birthday, 'd') > 0) ? {isYoung: true}
           : null;
  }
}
