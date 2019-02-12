import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

const limitOfStrings = 2;

function isLowerCase (arr: string[]) {
  let isLowerCase = arr.map((word) => word.slice(1))
    .every((symbol) => symbol.toLowerCase() === symbol);
  return isLowerCase;
}

function isUpperCase(arr: string[]) {
  let isCapital = arr.map((word) => word.slice(0, 1)).
  every((symbol) => symbol.toUpperCase() === symbol);
  return isCapital;
}

export function caseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const namesArray = (control.value) ? control.value.split(' ') : null;
    if (namesArray && namesArray.length <= limitOfStrings) {
      return !isUpperCase(namesArray) ? {notCapital: true} :
             !isLowerCase(namesArray) ? {notLower: true} :
             null;
    }
    return {wrongLength: true}
  }
}
