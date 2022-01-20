import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { PasajerosActualesPorBus } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public contadorApiUrl = environment.contadorApiUrl + '/api'
  public plate!: string | undefined

  constructor(private http: HttpClient) {}

  getAddress(lat: string | number, lng: string | number) {
    /* let latitud = 19.4978;
    let longitud = -99.1269; */
    const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    /* ?latlng=' + latitud + ',' + longitud+ '&key=TU_LLAVE_API_DE_GOOGLE_MAPS' */ const params = new HttpParams()
      .set('latlng', `${lat},${lng}`)
      .set('key', environment.APIGoogleMaps)

    return this.http.post<any>(url, null, { params })
  }

  getTotalCurrentPassengers() {
    const endpoint = `${this.contadorApiUrl}/total_current_passengers`
    let params
    if (this.plate) {
      params = new HttpParams().set('plate', this.plate)
    }

    return this.http.get<PasajerosActualesPorBus[]>(endpoint, { params })
  }
}
