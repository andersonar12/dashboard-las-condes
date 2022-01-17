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

  public async getFlowByGeoZones({
    flow,
    date
  }: TBodyAforo['flowByGeoZones']): Promise<TResponseAforo['flowByGeoZones'] | null> {
    try {
      const data = await this.http
        .get<TResponseAforo['flowByGeoZones']>(`${this.endpoint}/${flow}_by_geozone`, {
          params: { date }
        })
        .toPromise()

      return data || null
    } catch (error) {
      console.error('ERROR-GET-INPUT-BUSES', error.message)
      return null
    }
  }

  public async getTopGeoZones({ date, top }: TBodyAforo['topGeoZones']): Promise<TResponseAforo['topGeoZones'] | null> {
    try {
      const data = await this.http
        .get<TResponseAforo['topGeoZones']>(`${this.endpoint}/top_geozones`, {
          params: { date, top }
        })
        .toPromise()

      return data || null
    } catch (error) {
      console.error('ERROR-GET-TOP-GEOZONES', error.message)
      return null
    }
  }
}
