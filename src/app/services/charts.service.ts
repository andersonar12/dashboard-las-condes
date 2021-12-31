import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import * as echarts from 'echarts';
import Swal from 'sweetalert2'
import { environment } from '../../environments/environment';
import { TotalPasajeros, TotalPorDia, TotalPorHoraDeHoy, PromedioPasajeros } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {

  public contadorApiUrl = environment.contadorApiUrl +'/api'
  public plate!:string 
  constructor(private http: HttpClient) {}
  
  setOptionsChartsPassengers() {
    const options: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        /*           left: '3%',
            right: '4%',
            bottom: '2%', */
        top: 5,
        height: '70px',
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      series: [
        {
          name: 'Subida',
          data: [0, 932, 901, 934, 450],
          type: 'line',
          smooth: true,
          symbolSize: 10,
          symbol: 'emptyCircle',
          itemStyle: {
            color: '#0acdff',
          },
          lineStyle: {
            color: '#0acdff',
          },
        },
        {
          name: 'Bajada',
          data: [0, 300, 800, 750, 400],
          type: 'line',
          smooth: true,
          symbolSize: 10,
          symbol: 'emptyCircle',
          itemStyle: {
            color: '#ffbb00',
          },
          lineStyle: {
            color: '#ffbb00',
          },
        },
      ],
    };
    return options;
  }

  setOptionsChartsBusesInRoute() {
    const options: EChartsOption = {
      title: [
        {
          text: '100%',
          left: '45%',
          top: '37%',
          textAlign: 'center',
          textStyle: {
            color: 'black',
            fontSize: '15px',
          },
        },
      ],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'Buses en recorrido',
          type: 'pie',
          radius: ['55%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          /* emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold"
              } 
            },*/
          labelLine: {
            show: false,
          },
          data: [
            {
              value: 10,
              name: 'Buses',
              itemStyle: {
                color: '#ffbb00',
              },
            },
          ],
        },
      ],
    };
    return options;
  }

  setOptionsChartsAverageRise() {
    const options: EChartsOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        /*           left: '3%',
            right: '4%',
            bottom: '2%',
            width:'100%', */
        top: 6,
        height: '120px',
      },
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: false,
          lineStyle: {
            width: 2,
            color: '#0a77fe',
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0a77fe',
              },
              {
                offset: 1,
                color: '#ffffff',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: [140, 232, 250, 264, 290, 340, 250],
        },
      ],
    };
    return options;
  }

  async setOptionsChartsBoardingPassengers(date?:'this_week'|'this_month',start_date?:string,end_date?:string ) {

    let dataX:any
    let dataY:any

    /* let mapCustom = (data:any,funct:Function) => {
      return data.map(funct)
    }
 */
    if (date) { // para obtener total pasajeros por dia de la semana o mes
      await this.getTotalPassengersByDay(date).toPromise().then((resp)=>{
        console.log(resp)
        dataX = resp.map((i:any)=>i.date) 
        dataY = resp.map((i:any)=>i.enters) 
      })

    } else if(start_date && end_date){ // para obtener total pasajeros por rango de fecha
      await this.getTotalPassengersByDayByRange(start_date, end_date).toPromise().then((resp)=>{
        console.log(resp)
        dataX = resp.map((i:any)=>i.date) 
        dataY = resp.map((i:any)=>i.enters) 
      })
    }
    else { //total pasajeros por hora de hoy
      await this.getTotalPassengersByTimeToday().toPromise().then((resp)=>{
        console.log(resp)
        dataX = resp.map((i:any)=>i.hour+':00') 
        dataY = resp.map((i:any)=>i.pasajeros) 
      })

    }
    
    const options: EChartsOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX /* [
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
        ] */,
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        /*           left: '3%',
            right: '4%',
            bottom: '2%',
            */
        width: '95%',
        left: 30,
        top: 6,
        height: '120px',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      series: [
        {
          name: 'Subida',
          type: 'line',
          stack: 'Total',
          smooth: false,
          lineStyle: {
            width: 1,
            color: '#0762FF',
          },
          showSymbol: true,
          symbolSize: 10,
          symbol: 'emptyCircle',
          itemStyle: {
            borderWidth: 1,
            color: '#0762FF',
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0762FF',
              },
              {
                offset: 1,
                color: '#ffffff',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: dataY/* [
            140, 232, 222, 264, 290, 340, 250, 300, 300, 260, 160, 190, 220,
            310, 290, 260,
          ] */
        },
      ],
    };
    return options;
  }

  setOptionsChartsBarDisembarkationPassengers() {
    let dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指'];

    let data = [220, 182, 191, 234, 290, 330, 310, 123];

    const options: EChartsOption = {
      xAxis: {
        data: dataAxis,
        show: false,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      grid: {
        /*           left: '3%',
            right: '4%',
            bottom: '2%',
            */
        width: '95%',
        left: 30,
        top: 6,
        height: '350px',
      },
      series: [
        {
          type: 'bar',
          showBackground: false,
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#0A53FF' },
              { offset: 1, color: '#001954' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#0A53FF' },
                { offset: 1, color: '#001954' },
              ]),
            },
          },
          data: data,
        },
      ],
    };

    return options;
  }

  ///////////////////////////////PETICIONES/////////////////////////////////////////

  //Puede servir para obtener cantidad de pasajeros de acuerdo a (hoy, de la semana, del mes) se obtiene un total 
  getTotalPassengers(date:'today'|'this_week'|'this_month') {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/total_passengers`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

    let params
    if (this.plate)  params = new HttpParams().set('date', date).set('plate', this.plate)
    else params = new HttpParams().set('date', date)

    return this.http.get<TotalPasajeros>(endpoint, { headers: headers, params })
  }

  getTotalPassengersByRangeDate(start_date: string, end_date: string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/total_passengers`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

    let params
    if (this.plate)  params = new HttpParams().set('start_date', start_date)
    .set('end_date', end_date).set('plate', this.plate)
    else params = new HttpParams().set('start_date', start_date)
    .set('end_date', end_date)
    
    return this.http.get<TotalPasajeros>(endpoint, { headers: headers, params })
  }
//Puede servir para obtener cantidad de pasajeros de acuerdo a (hoy, de la semana, del mes) se obtiene un total

getTotalPassengersByTimeToday() {//Este da como resultado un array por horas
  const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
  const endpoint = `${this.contadorApiUrl}/total_passengers_by_day`;
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

  let params
    if (this.plate)  params = new HttpParams().set('date', 'today').set('plate', this.plate)
    else params = new HttpParams().set('date', 'today')

  return this.http.get<TotalPorHoraDeHoy[]>(endpoint, { headers: headers, params })//Este da como resultado un array por horas
}

  getTotalPassengersByDay(date:'today'|'this_week'|'this_month') {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/total_passengers_by_day`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
   
    let params
    if (this.plate)  params = new HttpParams().set('date', date).set('plate', this.plate)
    else params = new HttpParams().set('date', date)

    return this.http.get<TotalPorDia[]>(endpoint, { headers: headers, params })
  }

  getTotalPassengersByDayByRange(start_date:string,end_date:string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/total_passengers_by_day`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
                                
    let params
    if (this.plate)  params = new HttpParams().set('start_date', start_date).set('end_date', end_date).set('plate', this.plate)
    else params = new HttpParams().set('start_date', start_date).set('end_date', end_date)

    return this.http.get<TotalPorDia[]>(endpoint, { headers: headers, params })
  }


  /* Para obtener Promedio de Pasajeros */

  getAveragePassengersByTimeToday() {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/avg_passengers`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    let params
    if (this.plate)  params = new HttpParams().set('date', 'today').set('plate', this.plate)
    else params = new HttpParams().set('date', 'today')

    return this.http.get<PromedioPasajeros[]>(endpoint, { headers: headers, params })
  }

  getAveragePassengersByDay(date:'today'|'this_week'|'this_month') {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/avg_passengers`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

    let params
    if (this.plate)  params = new HttpParams().set('date', date).set('plate', this.plate)
    else params = new HttpParams().set('date', date) 

    return this.http.get<PromedioPasajeros[]>(endpoint, { headers: headers, params })
  }

  getAveragePassengersByDayByRange(start_date:string,end_date:string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.contadorApiUrl}/avg_passengers`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  

    let params
    if (this.plate)  params = new HttpParams().set('start_date', start_date).set('end_date', end_date).set('plate', this.plate)
    else params = new HttpParams().set('start_date', start_date).set('end_date',end_date)                               

    return this.http.get<PromedioPasajeros[]>(endpoint, { headers: headers, params })
  }
  /* Para obtener Promedio de Pasajeros */

  ///////////////////////////////PETICIONES/////////////////////////////////////////
}
