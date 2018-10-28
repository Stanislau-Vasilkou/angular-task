import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";



export function ageValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const dot: string = '.';
    const value = control.value;
    const isNumeric = isNaN(parseFloat(value)) && isFinite(value);
    const isInteger = Number.isInteger(+value);

    return (isNumeric) ? {message: "Inputed age is not a number"} :
      (!isInteger ||  value.includes(dot)) ? {message: "Inputed age is not a integer"} :
        (value > maxAge || value < minAge) ? {message : "Inputed  age is not in range from 18 to 65"} :
          null;
  };
}
