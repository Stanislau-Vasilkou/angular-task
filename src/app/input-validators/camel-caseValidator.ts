import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function camelCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if(control.value) {
      const arr = control.value.split(' ');
      console.log(arr);
      if (arr.length <= 2) {

        return null;
      }
      return {message: "Inputed data have to consist of one or two words"}
    }
  }
}
