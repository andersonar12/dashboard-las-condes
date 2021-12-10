import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import * as echarts from 'echarts';
@Injectable({
  providedIn: 'root',
})
export class ChartsService {
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
          itemStyle:{
            color:'#0acdff'
          },
          lineStyle:{
            color:'#0acdff'
          }
        },
        {
          name: 'Bajada',
          data: [0, 300, 800, 750, 400],
          type: 'line',
          smooth: true,
          symbolSize: 10,
          symbol: 'emptyCircle',
          itemStyle:{
            color:'#ffbb00'
          },
          lineStyle:{
            color:'#ffbb00'
          }
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

  setOptionsChartsAverageRise(){
    const options:EChartsOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
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
            color:'#0a77fe'
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0a77fe'
              },
              {
                offset: 1,
                color: '#ffffff'
              }
            ]),

          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 250, 264, 290, 340, 250]
        },
      ]
    };
    return options
  }


}
