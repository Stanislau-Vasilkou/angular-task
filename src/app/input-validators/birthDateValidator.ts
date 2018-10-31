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
    return (currentDay.diff(birthday, 'y') < 0) ? {message: "Seriously? Are you from future?"}
           : (currentDay.diff(birthday, 'y') > maxAge)  ? {message: "You are over 65 years of age"}
           : (currentDay.diff(birthday, 'y') < minAge && currentDay.diff(birthday, 'y') > 0) ? {message: "You are" +
            " under 18 years of age"}
           : null;
  }
}
