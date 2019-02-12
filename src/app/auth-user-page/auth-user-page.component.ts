import {AfterContentChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../user";
import {myStorage} from "../login/login.component";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth-user-page',
  templateUrl: './auth-user-page.component.html',
  styleUrls: ['./auth-user-page.component.scss']
})
export class AuthUserPageComponent implements OnInit {
  user: User;
  index: number;
  id;
  loaded: boolean = false;


  constructor(private userService: UserService ) {
  }

  ngOnInit() {
    this.id = myStorage.getItem('authId');
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUser(this.id).pipe(
      map((users) => {
        this.loaded = true;
        return users})
    ).subscribe(users => this.user = users);
    this.index = 1;
  }

}
