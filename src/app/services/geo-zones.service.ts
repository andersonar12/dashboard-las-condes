import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from '@ENV'

@Injectable({
  providedIn: 'root'
})
export class GeoZonesService {
  constructor(private http: HttpClient) {}

  public async getReportBuses({ plate, date }: TBodyAforo['busReport']): Promise<TResponseAforo['busReport'] | null> {
    const endpoint = environment.contadorApiUrl + '/api'

    try {
      const data = await this.http
        .get<TResponseAforo['busReport']>(`${endpoint}/bus_report`, {
          params: {
            plate: 'LGJW-26',
            date: '2022-01-04'
          }
        })
        .toPromise()

      if (data) return data
      else return null
    } catch (error) {
      console.error('ERROR-GET-REPORT:', error.message)
      return null
    }
  }
}
