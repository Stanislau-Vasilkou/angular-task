import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function ageValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const dot: string = '.';
    const value = control.value;
    const isNumeric = isNaN(parseFloat(value)) && isFinite(value);
    const isInteger = Number.isInteger(+value);

    return (isNumeric) ? {isNotNumber: true} :
      (!isInteger ||  value.includes(dot)) ? {isNotInteger: true} :
        (value > maxAge || value < minAge) ? {isNotInRange : true} :
          null;
  };
}
