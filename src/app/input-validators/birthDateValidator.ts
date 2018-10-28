import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";

let counterAge = 0;

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    counterAge++;
    console.log("age valid was called " + counterAge + "times");
    const maxDate = "01.01.1950";
    const minDate = "01.01.2000";
    const limitMaxDate = +moment(maxDate, ["DD.MM.YYYY"], true).format('x');
    const limitMinDate = +moment(minDate, ["DD.MM.YYYY"], true).format('x');
    const value = control.value;
    const currentDate = +moment(value, ["YYYY/MM/DD", "DD MMMM YYYY", "DD-MMM-YY"], true).format('x');
    return (currentDate > limitMinDate) ? {message: "You are so young"} : (currentDate < limitMaxDate) ? {message: "You are so old"} : null;
  }
}
