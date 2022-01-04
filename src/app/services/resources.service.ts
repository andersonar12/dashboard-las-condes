import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { delay, map, retryWhen, take } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import Swal from 'sweetalert2'
import { MachineGPS, ResponseDevicesGPS } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  
  public contadorApiUrl = environment.contadorApiUrl +'/api/'
 
  constructor(private http: HttpClient) {}

  getDevicesGPS(){
   
    const endpoint = 'https://socketgpsv1.witservices.io/sapi/devices';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('tokenLiveGPS')!).access_token
    })
    return this.http.get<ResponseDevicesGPS>(endpoint, { headers: headers }).pipe(
      retryWhen( err => err.pipe(delay(1500),take(2) )) 
    )
  }

  presentLoader(){
    Swal.fire({
      title: 'Cargando',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  closeLoader = () => Swal.close()


  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  /* Buscador  */
  searchResources(value: string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `/m_resources`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    const params = new HttpParams().set('search', value)
    return this.http.get<any>(endpoint, { headers: headers, withCredentials: true, params })
  }
  /* Buscador */


  add(data: Object ) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `/m_resources`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    /* const body = {
      resource_movie:
      {
        ...data
      }
    } */

    let formData = new FormData();


    return this.http.post<any>(endpoint, formData, { headers: headers, withCredentials: true })
  }

  update(data: Object,id:string ) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `/m_resources/${id}`;
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`})


    /* const body = {
      resource_movie:
      {
        ...data
      }
    } */

    let formData = new FormData();
    return this.http.patch<any>(endpoint, formData, { headers: headers, withCredentials: true })
  }

  delete(id: string) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `/m_resources/${id}`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

    return this.http.delete<any>(endpoint, { headers: headers, withCredentials: true })
  }

  getResources() {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `/m_resources`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    return this.http.get<any>(endpoint, { headers: headers, withCredentials: true })
  }

}