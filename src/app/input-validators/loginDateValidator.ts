import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";
import {dateFormats} from "./dateFormaValidator";

const foundingDate = '01.10.2018';


export function loginDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const systemDate = +moment(foundingDate, ["DD.MM.YYYY"], true);
    const inputtedValue = control.value;
    const inputtedDate = +moment(inputtedValue, dateFormats, true);
    return (inputtedDate < systemDate) ? {wrongLoginDate: true}
           : (inputtedDate > +moment()) ? {fromFuture: true}
           : null;
  }
}
