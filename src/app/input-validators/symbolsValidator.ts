import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function symbolsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (control.value) {
      const arr = control.value.split('');
      const result = arr.every((item) => {
        const symbol = item.charCodeAt(0);
        return (symbol > 64 && symbol < 123 || symbol === 32);
      });
      return result ?  null : {forbiddenSymbols: true};
    }
  }
}

