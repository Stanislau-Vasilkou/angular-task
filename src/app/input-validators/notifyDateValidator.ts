import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";
import {dateFormats} from "./dateFormaValidator";


export function notifyDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const currentDate = +moment();
    const inputedValue = control.value;
    return (+moment(inputedValue, dateFormats, true) < currentDate) ? {message: "Date of notification can't be" +
        " early than current"} : null;
  }
}
