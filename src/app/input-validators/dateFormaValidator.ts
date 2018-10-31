import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";

export const dateFormats = ["YYYY/MM/DD", "DD MMMM YYYY", "DD-MMM-YY"];

export function dateFormatValidator(): ValidatorFn {
  return  (control: AbstractControl): ValidationErrors => {
    const inputedValue = control.value;
    return !moment(inputedValue, dateFormats, true ).isValid() ? {message: "wrong date format"} : null;
  }
}
