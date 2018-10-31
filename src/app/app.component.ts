import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ageValidator} from "./input-validators/ageValidator";
import {dateFormatValidator} from "./input-validators/dateFormaValidator";
import {loginDateValidator} from "./input-validators/loginDateValidator";
import {notifyDateValidator} from "./input-validators/notifyDateValidator";
import {birthDateValidator} from "./input-validators/birthDateValidator";
import {symbolsValidator} from "./input-validators/symbolsValidator";
import {caseValidator} from "./input-validators/caseValidator";
import {asyncNameValidator} from "./input-validators/asyncNameValidator";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  userForm: FormGroup;
  err: string;
  submitted: boolean;
  hints = {
    "name": "One or two words. Only latin symbols",
    "age": "From 18 till 65 years",
    "dates": "Date formats: 2018/10/18 or 18 october 2018 or 10-oct-18"
  };

  ngOnInit() {
    this.submitted = false;
    this.userForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, symbolsValidator(), caseValidator()],
        asyncValidators: [asyncNameValidator()],
        updateOn: "blur"
      }),
      age: new FormControl(null, {
        validators: [Validators.required, ageValidator(18, 65)],
        asyncValidators: [],
        updateOn: "blur"
      }),
      birthday: new FormControl(null, {
        validators: [Validators.required, dateFormatValidator(), birthDateValidator()],
        asyncValidators: [],
        updateOn: "blur"
      }),
      loginDate: new FormControl(null, {
        validators: [Validators.required, dateFormatValidator(), loginDateValidator()],
        asyncValidators: [],
        updateOn: "blur"
      }),
      firstNotificationDate: new FormControl(null, {
        validators: [Validators.required, dateFormatValidator(), notifyDateValidator()],
        asyncValidators: [],
        updateOn: "blur"
      })
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  getErrMsg(control: string) {
    const inputController: AbstractControl = this.userForm.controls[control];
    if (inputController.hasError('required') && inputController.touched) {
      this.err = 'Please, enter a value';
    } else if (inputController.hasError('message') && inputController.touched) {
      this.err = inputController.errors.message;
    }
    return this.err;
  }

}






