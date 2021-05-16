import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Authentication } from '../models/authentication';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  authentication = new Authentication();
  constructor(private http: HttpClient, private router: Router ) {
    const token = localStorage.getItem('authorizationData');
    if(!token)return;
    const tokenParser = this.jwtHelper.decodeToken(JSON.stringify(token));
    this.authentication.userName = tokenParser.email;
    this.authentication.roles  = tokenParser.role;
    this.authentication.token =  token;
  }


  logOut() {
    localStorage.setItem('authorizationData', JSON.stringify({}));
    this.authentication = new Authentication();
  }

  login(userLogin: any) {
    return this.http.post(this.baseApiUrl + 'token', userLogin)
                    .pipe(
                        map((response: any) => {
                           if (response) {
                               localStorage.setItem('authorizationData', response.accessToken.token);
                               const tokenParser = this.jwtHelper.decodeToken(response.accessToken.token);
                               this.authentication.userName = tokenParser.email;
                               this.authentication.roles  = tokenParser.role;
                               this.authentication.token =  response.accessToken.token;
                           }
                        })
                    );
  }

  isAuthenticated(){
    return  this.authentication && this.authentication.userName != null ;
  }

  register(user: any) {
    return this.http.post(this.baseApiUrl + 'register', user);
  }


}
