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

import { environment } from '@ENV'

@Injectable({
  providedIn: 'root'
})
export class LiveGpsInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/sapi')) {
      const url: string = environment.liveGpsApiUrl + req.url
      const contentType = req.headers.get('Content-Type')
      const accessToken: string = JSON.parse(localStorage.getItem('tokenLiveGPS') || '')?.access_token || ''

      const reqClone = req.clone({
        url,
        headers: new HttpHeaders({
          'Content-Type': contentType || 'application/json',
          Authorization: 'Bearer ' + accessToken
        })
      })

      return next.handle(reqClone).pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('REQUEST-LIVE-GPS-ERROR ->', err.message)

          return throwError({
            status: err.status,
            error: err.error
          })
        })
      )
    } else return next.handle(req)
  }
}
