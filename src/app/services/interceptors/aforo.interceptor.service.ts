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

import { AuthService } from '@SERVICES/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AforoInterceptorService implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('user') || ''
    let request = req
    let url = request.url.split('//')[1]

    if (user && url.indexOf('contador-personas') >= 0) {
      const tokenParse = (JSON.parse(user) as TUser).token
      request = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${tokenParse}`
        })
      })
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('REQUEST-AFORO-ERROR ->', err.message)
        let { status, error } = err
        let message = ''

        // Si la sesión existe y el status es "Unauthorized" entonces editamos el "status" y el "message"
        // para que corresponda a un error de vencimiento de token
        if (user && status === 401) {
          status = 440
          message = 'Session has expired'
          this.authService.logOut({ sessionExpired: true })
        } else {
          // Extraemos el mensaje de error de la petición
          if (typeof error === 'string') message = error
          else message = error instanceof Error ? error.message : error.errors.detail
        }

        return throwError({
          status,
          message
        })
      })
    )
  }
}
