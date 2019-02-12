import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, EventEmitter, Input, OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChanges
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ageValidator} from "../../input-validators/ageValidator";
import {dateFormatValidator} from "../../input-validators/dateFormaValidator";
import {loginDateValidator} from "../../input-validators/loginDateValidator";
import {notifyDateValidator} from "../../input-validators/notifyDateValidator";
import {birthDateValidator} from "../../input-validators/birthDateValidator";
import {symbolsValidator} from "../../input-validators/symbolsValidator";
import {caseValidator} from "../../input-validators/caseValidator";
import {asyncNameValidator} from "../../input-validators/asyncNameValidator";
import {ErrorHandlerService} from "../../input-validators/error-handler.service";
import {User} from "../../user";
import {UserService} from "../../services/user.service";
import {myStorage} from "../../login/login.component";
import {LocaleService} from "../../services/locale.service";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {of} from "rxjs";

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})

export class FormEditorComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  editedUser: User = new User();
  loaded: boolean = false;
  id;

  @Input('user') authUser: User;
  @Output() updateUserEvent: EventEmitter<User> = new EventEmitter();

  constructor (private errorHandler: ErrorHandlerService,
               public localeService: LocaleService,
               private userService: UserService,
               private router: Router) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, symbolsValidator(), caseValidator()],
        asyncValidators: [],
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
    this.id = myStorage.getItem('authId');
  }

  catchError(controlName) {
    return this.errorHandler.getErrMsg(controlName, this.userForm );
  }

  isInvalid(controlName) {
    return this.errorHandler.isControlInvalid(controlName, this.userForm);
  }

  updateUser() {
    this.getEditedUser();
    this.userService.updateUser(this.id, this.editedUser).pipe(
      tap(() => this.loaded = true)
    );
    this.updateUserEvent.emit(this.editedUser);
  }

  getEditedUser() {
    this.editedUser.name = this.userForm.controls.name.value;
    this.editedUser.age = this.userForm.controls.age.value;
    this.editedUser.birthday = this.userForm.controls.birthday.value;
    this.editedUser.firstLoginDate = this.userForm.controls.loginDate.value;
    this.editedUser.notifyDate = this.userForm.controls.firstNotificationDate.value;
    }

   setValues(authUser: User) {
    this.userForm.controls.name.setValue(authUser.name);
    this.userForm.controls.age.setValue(authUser.age);
    this.userForm.controls.birthday.setValue(this.localeService.setLocale(authUser.birthday));
    this.userForm.controls.loginDate.setValue(this.localeService.setLocale(authUser.firstLoginDate));
    this.userForm.controls.firstNotificationDate.setValue(this.localeService.setLocale(authUser.notifyDate));
   }

  ngOnChanges() {
    if (typeof this.authUser !== 'undefined' && this.authUser !== null) {
      this.setValues(this.authUser);
    }
  }
}
