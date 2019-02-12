import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";
import {dateFormats} from "./dateFormaValidator";


export function notifyDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const currentDate = +moment();
    const inputtedValue = control.value;
    return (+moment(inputtedValue, dateFormats, true) < currentDate) ? {wrongNotifyDate: true} : null;
  }
}
