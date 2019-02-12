import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {LocaleService} from "../../services/locale.service";
import {User} from "../../user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit, DoCheck {
  userInfoForm: FormGroup;

  @Input('user') authUser: User;
  @Input() loaded: boolean;

  constructor(public localeService: LocaleService) {
  }

  ngOnInit() {
    this.userInfoForm = new FormGroup({
      name: new FormControl(),
      age: new FormControl(),
      birthday: new FormControl(),
      loginDate: new FormControl(),
      firstNotificationDate: new FormControl()
    });
  }

  setValues() {
    this.userInfoForm.controls.name.setValue(this.authUser.name);
    this.userInfoForm.controls.age.setValue(this.authUser.age);
    this.userInfoForm.controls.birthday.setValue(this.authUser.birthday);
    this.userInfoForm.controls.loginDate.setValue(this.authUser.firstLoginDate);
    this.userInfoForm.controls.firstNotificationDate.setValue(this.authUser.notifyDate);
  }

  ngDoCheck(): void {
    if (typeof this.authUser !== 'undefined' && this.authUser !== null) {
      this.setValues();
    }
  }
}
