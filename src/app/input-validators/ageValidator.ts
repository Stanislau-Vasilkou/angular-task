import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";



export function ageValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const dot: string = '.';
    const value = control.value;
    const isNumeric = isNaN(parseFloat(value)) && isFinite(value);
    const isInteger = Number.isInteger(+value);

    return (isNumeric) ? {message: "Inputted age is not a number"} :
      (!isInteger ||  value.includes(dot)) ? {message: "Inputted age is not an integer"} :
        (value > maxAge || value < minAge) ? {message : "Inputted  age is not in range from 18 to 65"} :
          null;
  };
}
