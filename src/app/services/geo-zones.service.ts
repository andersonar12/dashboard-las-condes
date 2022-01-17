import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from '@ENV'

@Injectable({
  providedIn: 'root'
})
export class GeoZonesService {
  private endpoint: string = environment.contadorApiUrl + '/api'

  constructor(private http: HttpClient) {}

  public async getBusReport({ plate, date }: TBodyAforo['busReport']): Promise<TResponseAforo['busReport'] | null> {
    try {
      const data = await this.http
        .get<TResponseAforo['busReport']>(`${this.endpoint}/bus_report`, {
          params: { plate, date }
        })
        .toPromise()

      return data || null
    } catch (error) {
      console.error('ERROR-GET-REPORT:', error.message)
      return null
    }
  }

  public async getFlowByGeozone({
    flow,
    date
  }: TBodyAforo['flowByGeoZone']): Promise<TResponseAforo['flowByGeoZone'] | null> {
    try {
      const data = await this.http
        .get<TResponseAforo['flowByGeoZone']>(`${this.endpoint}/${flow}_by_geozone`, {
          params: { date }
        })
        .toPromise()

      return data || null
    } catch (error) {
      console.error('ERROR-GET-INPUT-BUSES', error.message)
      return null
    }
  }
}
