import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseAuthLiveGps } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = '';

  constructor(private http: HttpClient) {}

  //Este endpoint para iniciar en LiveGPS y obtener el token del mismo
  signInGPS() {
    const endpoint = 'https://socketgpsv1.witservices.io/api/gestsol-auth';
    const credenciales = { username: 'lascondes', password: 'lascondes' };

    return this.http.post<ResponseAuthLiveGps>(endpoint, credenciales).pipe(
      map((key) => {

        if (key.hasOwnProperty('error')) {
          alert(`Error Live GPS, ${JSON.stringify(key) }`);
          throw new Error(JSON.stringify(key));
        } else {
          localStorage.removeItem('tokenLiveGPS');
          localStorage.setItem('tokenLiveGPS', JSON.stringify(key));

          return key;
        }
      })
    );
  }

  signIn(data: any) {
    /* console.log(user) */

    const endpoint = `${this.apiUrl}/users/sign_in`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });

    const body = {
      email: data.email,
      password: data.password,
    };

    return this.http.post<any>(endpoint, JSON.stringify(body), {
      headers: headers,
      withCredentials: true,
    });
  }

  signUp(data: any) {
    const endpoint = `${this.apiUrl}/users/sign_up`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });

    let body = {};

    return this.http.post<any>(endpoint, body, {
      headers: headers,
      withCredentials: true,
    });
  }

  logOut() {
    const token = localStorage
      .getItem('token')
      ?.replace('"', '')
      .replace('"', '');
    const endpoint = `${this.apiUrl}/log_out`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(endpoint, null, { headers: headers });
  }
}
