import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";


export function loginDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const startDate = "01.01.2018";
    const systemDate = +moment(startDate, ["DD.MM.YYYY"], true).format('x');
    const value = control.value;
    const currentDate = +moment(value, ["YYYY/MM/DD", "DD MMMM YYYY", "DD-MMM-YY"], true).format('x');
    return (currentDate < systemDate) ? {message: "You couldn't register so early"} : null;
  }
}
