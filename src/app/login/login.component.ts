import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {caseValidator} from "../input-validators/caseValidator";
import {UserCheckedData, UserService} from "../services/user.service";
import {symbolsValidator} from "../input-validators/symbolsValidator";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../input-validators/error-handler.service";
import {AuthGuard} from "../guards/auth.guard";

export const myStorage = localStorage;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  visibleIcon: string = "visibility";
  type: string = "password";
  userData: UserCheckedData = {
    name: '',
    password: ''
  };
  id;

  constructor(public userService: UserService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private authGuard: AuthGuard) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, symbolsValidator(), caseValidator()],
        updateOn: 'blur'
      }),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
    })
  }

  showPass() {
    if(this.visibleIcon === 'visibility') {
    this.visibleIcon = 'visibility_off';
    this.type = 'text';
      return this.type;
    }
    this.visibleIcon = 'visibility';
    this.type = 'password';
  };

  getAuthUser() {
    this.userData.name = this.loginForm.controls.name.value;
    this.userData.password = this.loginForm.controls.password.value;
    this.userService.checkUserData(this.userData).subscribe(user => {
          this.id = user.id;
          myStorage.setItem('authId', this.id);
          this.router.navigate(['users']);
          this.authGuard.authStatus = true;
      });
  }

  catchError(controlName) {
    return this.errorHandler.getErrMsg(controlName, this.loginForm);
  }

  isInvalid(controlName) {
    return this.errorHandler.isControlInvalid(controlName, this.loginForm);
  }
}
