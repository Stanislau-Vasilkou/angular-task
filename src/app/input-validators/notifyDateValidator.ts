import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";


export function notifyDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const currentDate = Date.now();
    const value = control.value;
    return (+moment(value, ["YYYY/MM/DD", "DD MMMM YYYY", "DD-MMM-YY"], true).format('x') < currentDate) ? {message: "Date of notification cann't be early than current"} : null;
  }
}
