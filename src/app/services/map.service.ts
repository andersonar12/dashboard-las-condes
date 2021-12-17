import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  
  getAddress(lat:string|number,lng:string|number) {


    /* let latitud = 19.4978;
    let longitud = -99.1269; */
    const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    /* ?latlng=' + latitud + ',' + longitud
        + '&key=TU_LLAVE_API_DE_GOOGLE_MAPS' */;

    const params = new HttpParams().set('latlng', `${lat},${lng}`)
                                    .set('key',environment.APIGoogleMaps)

    return this.http.post<any>(url, null, { params })
  }

}
