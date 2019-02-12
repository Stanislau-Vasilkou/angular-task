import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";

export const dateFormats = ["YYYY/MM/DD", "DD MMMM YYYY", "DD-MMM-YY"];

export function dateFormatValidator(): ValidatorFn {
  return  (control: AbstractControl): ValidationErrors => {
    const inputtedValue = control.value;
    return !moment(inputtedValue, dateFormats, true ).isValid() ? {wrongDateFormat: true} : null;
  }
}
