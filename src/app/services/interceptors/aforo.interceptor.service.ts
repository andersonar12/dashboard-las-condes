import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  // HttpHeaders,
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
    // TODO: crear logica para interceptar las peticiones de los servicios de aforo

    return next.handle(req).pipe(
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
