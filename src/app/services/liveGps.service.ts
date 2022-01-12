import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, retryWhen, take } from 'rxjs/operators'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LiveGpsService {
  constructor(private http: HttpClient) {}

  public getDevicesGPS() {
    return this.http
      .get<TResponseDevicesGPS>('/sapi/devices')
      .pipe(retryWhen(err => err.pipe(delay(1500), take(2))))
  }

  public presentLoader() {
    Swal.fire({
      title: 'Cargando',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  public closeLoader = () => Swal.close()

  /* Buscador  */
  /* searchResources(value: string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `/m_resources`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    const params = new HttpParams().set('search', value)
    return this.http.get<any>(endpoint, { headers: headers, withCredentials: true, params })
  } */
  /* Buscador */
}
