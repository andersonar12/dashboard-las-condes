import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { environment } from '../../environments/environment';
import { TotalPasajeros, TotalPorDia, TotalPorHoraDeHoy, PromedioPasajeros } from '../interfaces/interfaces';
import { Router, Event, NavigationStart, NavigationError } from '@angular/router';

import { LiveGpsService } from '@SERVICES/liveGps.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  public contadorApiUrl = environment.contadorApiUrl +'/api'
  public plate!:string | undefined
  public totalBusesActive!: string | number
  public totalPassengersInWeek!: string | number
  public averageRise:string = '0'
  /* public totalBusesInactive!: string | number */

  constructor(private http: HttpClient,private router: Router, private resService: LiveGpsService) {
    //Aqui podemos escuchar cuando se cambia de ruta en la aplicacion
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          this.plate = undefined
      }

      /* if (event instanceof NavigationError) {
          // Present error to user
          console.log(event.error);
      } */
  });
  }

  async setOptionsChartsPassengers() {

    let data:any

    await Promise.all([this.getTotalPassengersByDay('this_week').toPromise()])
      .then(([res])=>{
        this.totalPassengersInWeek = res.reduce((prev, current) => prev + current.enters, 0)
        data= res
        console.log(data)
      })

    const options: EChartsOption = {
      xAxis: {
        type: 'category',
        data: /* data.map((d:TotalPorDia)=> d.date.replace(`${new Date().getFullYear()}-`,'')) ,*/
        ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
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
          data: data.map((d:TotalPorDia)=> d.enters)/* [0, 932, 901, 934, 450] */,
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
        /* {
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
        }, */
      ],
    };
    return options;
  }

  async setOptionsChartsBusesInRoute() {

    let data:any

    const percentageCalculator = (amount:number , total:number,)=> {
      return ((amount * 100) / total).toFixed(2)
   }

    await Promise.all([this.getTotalActiveMachinesToday().toPromise(), this.resService.getDevicesGPS().toPromise()])
          .then(([resp,resp2])=>{
            console.log(resp2)
            let activeBuses = resp // arreglo por placas buses en recorrido o activos
            let busFleet:Array<string> = resp2['data'].map((m)=>m.plate) //arreglo mapeado por placas de flota de buses (estacionados)

            let totalBusesActive = 0
            let totalBusesInactive = busFleet.length

            activeBuses.forEach((bus)=>{

              const finded = busFleet.indexOf(bus)
              if(finded >= 0){
                totalBusesActive =+1 //se suma uno a uno si el bus esta activo
                totalBusesInactive --//y lo restamos de los buses inactivos
              }
            })

            this.totalBusesActive = totalBusesActive
            /* this.totalBusesInactive = totalBusesInactive */
            console.log('Activos:'+ totalBusesActive,'Inactivos:'+ totalBusesInactive)

            //calculamos los porcentajes
            let activePercentage = percentageCalculator(totalBusesActive,busFleet.length)
            let inactivePercentage= percentageCalculator(totalBusesInactive,busFleet.length)

            console.log('Porcentaje activos:'+activePercentage,'Porcentaje inactivos:'+inactivePercentage)


            data = {activePercentage,totalBusesActive,totalBusesInactive}
          })

    const options: EChartsOption = {
      title: [
        {
          text: `${data.activePercentage}%`,
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
          name: 'Buses',
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
              value:data['totalBusesActive'],
              name: 'Buses Activos',
              itemStyle: {
                color: '#ffbb00'
              },
            },
            {
              value: data['totalBusesInactive'],
              name: 'Buses Inactivos',
              itemStyle: {
               color: '#0acdff',
              }
            },
          ],
        },
      ],
    };
    return options;
  }

  async setOptionsChartsAverageRise() {

    let data:any

    await Promise.all([this.getTotalPassengersByDay('this_week').toPromise()])
      .then(([res])=>{
        this.averageRise = '0'
        if(res.length > 0){
          this.averageRise = (res.reduce((prev, current) => prev + current.enters, 0) / res.length).toFixed(2)
        }
        data = res
      })

    const options: EChartsOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab','Dom'],
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
            width: 2,
            color: '#0a77fe',
          },
          showSymbol: true,
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
          data: data.map((d:TotalPorDia)=> d.enters),
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
      await this.getTotalPassengersByDay(date,'enter').toPromise().then((resp)=>{
        dataX = resp.map((i:any)=>i.date)
        dataY = resp.map((i:any)=>i.enters)
      })

    } else if(start_date && end_date){ // para obtener total pasajeros por rango de fecha
      await this.getTotalPassengersByDayByRange(start_date, end_date,'enter').toPromise().then((resp)=>{
        dataX = resp.map((i:any)=>i.date)
        dataY = resp.map((i:any)=>i.enters)
      })
    }
    else { //total pasajeros por hora de hoy
      await this.getTotalPassengersByTimeToday('enter').toPromise().then((resp)=>{
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

  async setOptionsChartsBarDisembarkationPassengers(date?:'this_week'|'this_month',start_date?:string,end_date?:string) {

    let dataX:any
    let dataY:any

    if (date) { // para obtener total pasajeros por dia de la semana o mes
      await this.getTotalPassengersByDay(date,'exit').toPromise().then((resp)=>{
        dataX = resp.map((i:any)=>i.date)
        dataY = resp.map((i:any)=>i.enters)
      })

    } else if(start_date && end_date){ // para obtener total pasajeros por rango de fecha
      await this.getTotalPassengersByDayByRange(start_date, end_date,'exit').toPromise().then((resp)=>{
        dataX = resp.map((i:any)=>i.date)
        dataY = resp.map((i:any)=>i.enters)
      })
    }
    else { //total pasajeros por hora de hoy
      await this.getTotalPassengersByTimeToday('exit').toPromise().then((resp)=>{
        dataX = resp.map((i:any)=>i.hour+':00')
        dataY = resp.map((i:any)=>i.pasajeros)
      })
    }

    const options: EChartsOption = {
      xAxis: {
        data: dataX,
        show: true,
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
        height: '340px',
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
          data: dataY,
        },
      ],
    };

    return options;
  }

  ///////////////////////////////PETICIONES/////////////////////////////////////////

  //Puede servir para obtener cantidad de pasajeros de acuerdo a (hoy, de la semana, del mes) se obtiene un total
  getTotalPassengers(date:'today'|'this_week'|'this_month') {

    const endpoint = `${this.contadorApiUrl}/total_passengers`;

    let obj:any = {}

    obj['date'] = date
    obj['event_type'] = 'enter'
    if (this.plate)  obj['plate'] = this.plate

    let params = new HttpParams({ fromObject: obj })

    return this.http.get<TotalPasajeros>(endpoint, { params })
  }

  getTotalPassengersByRangeDate(start_date: string, end_date: string) {

    const endpoint = `${this.contadorApiUrl}/total_passengers`;

    let obj:any= {}

    obj['start_date'] = start_date
    obj['end_date'] = end_date
    obj['event_type'] = 'enter'

    if (this.plate)  obj['plate'] = this.plate

    let params = new HttpParams({ fromObject: obj })

    return this.http.get<TotalPasajeros>(endpoint, { params })
  }
//Puede servir para obtener cantidad de pasajeros de acuerdo a (hoy, de la semana, del mes) se obtiene un total

  getTotalPassengersByTimeToday(event_type?:'enter'|'exit') {//Este da como resultado un array por horas

    const endpoint = `${this.contadorApiUrl}/total_passengers_by_day`;

    let obj:any= {}

    obj['date'] = 'today'

    if (this.plate)  obj['plate'] = this.plate
    if (event_type)  obj['event_type'] = event_type

    let params = new HttpParams({ fromObject: obj })

    return this.http.get<TotalPorHoraDeHoy[]>(endpoint, { params })//Este da como resultado un array por horas
  }

  getTotalPassengersByDay(date:'today'|'this_week'|'this_month',event_type?:'enter'|'exit') {

    const endpoint = `${this.contadorApiUrl}/total_passengers_by_day`;

    let obj:any= {}

    obj['date'] = date

    if (this.plate)  obj['plate'] = this.plate
    if (event_type)  obj['event_type'] = event_type

    let params = new HttpParams({fromObject: obj })

    return this.http.get<TotalPorDia[]>(endpoint, { params })
  }

  getTotalPassengersByDayByRange(start_date:string,end_date:string,event_type?:'enter'|'exit') {

    const endpoint = `${this.contadorApiUrl}/total_passengers_by_day`;

    let obj:any= {}

    obj['start_date'] = start_date
    obj['end_date'] = end_date

    if (this.plate)  obj['plate'] = this.plate
    if (event_type)  obj['event_type'] = event_type

    let params = new HttpParams({fromObject: obj })

    return this.http.get<TotalPorDia[]>(endpoint, { params })
  }


  /* Para obtener Promedio de Pasajeros */

  getAveragePassengersByTimeToday() {

    const endpoint = `${this.contadorApiUrl}/avg_passengers`;

    let obj:any= {}

    obj['date'] ='today'
    obj['event_type'] = 'enter'
    if (this.plate)  obj['plate'] = this.plate

    let params = new HttpParams({ fromObject: obj })

    return this.http.get<PromedioPasajeros[]>(endpoint, { params })
  }

  getAveragePassengersByDay(date:'today'|'this_week'|'this_month') {

    const endpoint = `${this.contadorApiUrl}/avg_passengers`;

    let obj:any= {}

    obj['date'] = date
    obj['event_type'] = 'enter'
    if (this.plate)  obj['plate'] = this.plate

    let params = new HttpParams({ fromObject: obj })

    return this.http.get<PromedioPasajeros[]>(endpoint, { params })
  }

  getAveragePassengersByDayByRange(start_date:string,end_date:string) {

    const endpoint = `${this.contadorApiUrl}/avg_passengers`;

    let obj:any= {}

    obj['start_date'] = start_date
    obj['end_date'] = end_date
    obj['event_type'] = 'enter'
    if (this.plate)  obj['plate'] = this.plate

    let params = new HttpParams({ fromObject: obj })

    return this.http.get<PromedioPasajeros[]>(endpoint, { params })
  }
  /* Para obtener Promedio de Pasajeros */

  /* Obtener Buses activos  */

  getTotalActiveMachinesToday() {//Este da como resultado un array  de buses activo por placa

    const endpoint = `${this.contadorApiUrl}/active_vehicles`;
    let params = new HttpParams().set('date', 'today')

    return this.http.get<string[]>(endpoint, { params })
  }
}
