import {AfterViewInit, Component, DoCheck, NgModule, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ageValidator} from "./input-validators/ageValidator";
import {dateFormatValidator} from "./input-validators/dateFormaValidator";
import {loginDateValidator} from "./input-validators/loginDateValidator";
import {notifyDateValidator} from "./input-validators/notifyDateValidator";
import {birthDateValidator} from "./input-validators/birthDateValidator";
import {asyncNameValidator} from "./input-validators/asyncNameValidator";
import {symbolsValidator} from "./input-validators/symbolsValidator";
import {camelCaseValidator} from "./input-validators/camel-caseValidator";
import {isCamelCased} from "tslint/lib/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  hints = {
    "name": "One or two words. Only latin symbols",
    "age": "From 18 till 65 years",
    "dates": "Date formats: YYYY/MM/DD or DD MMMM YYYY or DD-MMM-YY"
  };

  userForm: FormGroup;
  err: string;
  counterReq = 0;
  counterMes = 0;

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(null,  {validators: [Validators.required, symbolsValidator(), camelCaseValidator()], asyncValidators: [], updateOn: "blur"}),
      age: new FormControl(null, {validators: [Validators.required, ageValidator(18, 65)], asyncValidators: [], updateOn: "blur"}),
      birthday: new FormControl(null, {validators: [Validators.required, dateFormatValidator(), birthDateValidator()], asyncValidators: [], updateOn: "blur"}),
      loginDate: new FormControl(null, {validators: [Validators.required, dateFormatValidator(), loginDateValidator()], asyncValidators: [], updateOn: "blur"}),
      firstNotificationDate: new FormControl(null, {validators: [Validators.required, dateFormatValidator(), notifyDateValidator()], asyncValidators: [], updateOn: "blur"})
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  getErrMsg(control: string) {
    const inputController: AbstractControl = this.userForm.controls[control];
    if (inputController.hasError('required')) {
      this.counterReq++;
      console.log("req = " + this.counterReq);
      this.err = 'Please, enter a value' + this.counterReq;
    } else if (inputController.hasError('message')) {
      this.counterMes++;
      console.log("mess = " + this.counterMes);
      this.err = inputController.errors.message;
    }
    return this.err;
  }
}




