import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../user";

const SERVER_URL: string = 'http://localhost:3000/users';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export interface UserCheckedData {
  name: string,
  password: string
}

@Injectable({
   providedIn: 'root'
})

export class UserService {
  loader: boolean = false;

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${SERVER_URL}`).pipe(
      catchError(this.handleError),
    );
  }

  getUser(userId: number): Observable<User> {
    return this._http.get<User>(`${SERVER_URL}/${userId}`)
      .pipe(
        tap((user: User) => !user.id ? this.loader = true : this.loader = false),
        catchError(this.handleError),
      );
  }

  updateUser(userId: number, user: User) {
    return this._http.put(`${SERVER_URL}/${userId}`, user, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  checkUserData(data: UserCheckedData): Observable<User> {
    return this._http.post<User>(`${SERVER_URL}/login`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addUser(user: User): Observable<any> {
    return this._http.post(`${SERVER_URL}/add`, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`${SERVER_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

 handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, error: ${error.error.text}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
