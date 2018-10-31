import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";
import {dateFormats} from "./dateFormaValidator";

const foundingDate = '01.10.2018';


export function loginDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const systemDate = +moment(foundingDate, ["DD.MM.YYYY"], true);
    const inputedValue = control.value;
    const inputedDate = +moment(inputedValue, dateFormats, true);
    return (inputedDate < systemDate) ? {message: "You couldn't register so early (service works from " + foundingDate + ")"}
           : (inputedDate > +moment()) ? {message: "Seriously? Are you from future?"}
           : null;
  }
}
