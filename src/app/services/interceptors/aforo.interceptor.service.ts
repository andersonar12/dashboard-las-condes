import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AforoInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token = localStorage.getItem('token')!;
    let request = req;
    let url = request.url.split('//')[1]

    if (token && url.indexOf('contador-personas') >= 0) {

      const tokenParse = JSON.parse(token)?.token
      request = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${ tokenParse }`
        }),
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('REQUEST-AFORO-ERROR ->', err.message)

        return throwError({
          status: err.status,
          error: err.error
        })
      })
    )
  }
}
