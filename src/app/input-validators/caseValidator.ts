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
      return !isUpperCase(namesArray) ? {message: "First symbol of each word must be a capital letter"} :
             !isLowerCase(namesArray) ? {message: "All symbols after first must be a lower case letters"} :
             null;
    }
    return {message: "Inputted data must consist of one or two words"}
  }
}
