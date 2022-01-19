import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'

import { ResponseAuthLiveGps } from '@ENTITIES/interfaces'
import { environment } from '@ENV'

const { contadorApiUrl, liveGpsApiUrl, liveGpsCredential } = environment

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: '*/*'
  })

  constructor(private http: HttpClient) {}

  public async signIn(user: TLogin): Promise<void | string> {
    const endpoint = `${contadorApiUrl}/users/signin`
    const body: TBodyAforo['signIn'] = { user }

    try {
      // TODO: descomentar esta porcion de codigo cuando se solucione el error 404 desde el backend
      // const { token } = await this.http
      //   .post<TResponseAforo['signIn']>(endpoint, body, {
      //     headers: this.headers,
      //     withCredentials: true
      //   })
      //   .toPromise()
      // ________________________________________
      let token = 'OK'

      if (token) {
        localStorage.setItem('user', JSON.stringify(<TUser>{ ...body.user, token }))
        await this.signInGPS()
      }
    } catch (error) {
      localStorage.removeItem('user')
      const { status } = error as TResponseError
      let message = ''

      switch (status) {
        case 404: {
          message = 'Usuario no encontrado'
          break
        }
        case 401: {
          message = 'Usuario no autorizado'
          break
        }
      }

      throw message
    }
  }

  private async signInGPS(): Promise<void | Error> {
    // Este endpoint para iniciar en LiveGPS y obtener el token del mismo
    const endpoint = `${liveGpsApiUrl}/api/gestsol-auth`

    const key = await this.http.post<ResponseAuthLiveGps>(endpoint, liveGpsCredential).toPromise()

    if (key.hasOwnProperty('error')) {
      alert(`Error Live GPS, ${JSON.stringify(key)}`)
      throw new Error(JSON.stringify(key))
    } else {
      localStorage.removeItem('tokenLiveGPS')
      localStorage.setItem('tokenLiveGPS', JSON.stringify(key))
    }
  }

  // public async signUp(user: TSingUp): Promise<void | Error> {
  //   const endpoint = `${liveGpsApiUrl}/users/signup`
  //   const body: TBodyAforo['signUp'] = { user }

  //   try {
  //     const { data } = await this.http
  //       .post<TResponseAforo['signUp']>(endpoint, body, {
  //         headers: this.headers
  //       })
  //       .toPromise()

  //     console.log(data)
  //   } catch (error) {
  //     const { status } = error as TResponseError
  //     // manejar error...
  //   }
  // }

  public logOut(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('tokenLiveGPS')
  }
}
