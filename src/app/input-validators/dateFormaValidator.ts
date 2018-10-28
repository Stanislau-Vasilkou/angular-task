import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";

export function dateFormatValidator(): ValidatorFn {
  return  (control: AbstractControl): ValidationErrors => {
    const value = control.value;
    return !moment(value, ["YYYY/MM/DD", "DD MMMM YYYY", "DD-MMM-YY"], true ).isValid() ? {message: "wrong date format"} : null;
  }
}
