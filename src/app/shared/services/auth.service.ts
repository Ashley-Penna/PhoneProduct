import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  private AUTH_API_URL = `${environment.API_URL}`;
  userSubject: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) { }

  login(user: User): Observable<{success: boolean, user: User}> {
    return this.http.post<{success: boolean, user: User}>(`${this.AUTH_API_URL}/login`, user)
      .pipe(
        map((res: {success: boolean, user: User}) => {
          if (res && res.success) {
            this.userSubject.next(res.user);
          }
          return res;
        })
      );
  }

  register(user: User): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${this.AUTH_API_URL}/register`, user);
  }

}
