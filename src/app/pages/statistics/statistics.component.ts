import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ChartsService } from '../../services/charts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResourcesService } from '../../services/resources.service';
import { forkJoin, Subscription } from 'rxjs';
import { MachineGPS, TotalPasajeros, PromedioPasajeros } from '../../interfaces/interfaces';

import * as echarts from 'echarts';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  /////// Contadores
  public totalPassengers!:number|string
  public averagePassengers!:number|string
  public totalMachines!:number |string
  //////// Graficas
  public dataChartsSub!:Subscription
  public optionChart1!:any
  public optionChart2!:any

  public machines!:MachineGPS[]
  public machinePicked!:string  | undefined

  public displayedColumns: string[] = ['time','machine', 'route'];
  public dataSource!: MatTableDataSource<any>
  public minDate = new Date()
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private cd: ChangeDetectorRef, public charts:ChartsService, public resService: ResourcesService) { 
    
  }

  public rangeDatePicker = new FormGroup({
    start_date: new FormControl('',[Validators.required]),
    startTime:new FormControl('',[Validators.required]),
    end_date: new FormControl('',[Validators.required]),
    endTime: new FormControl('',[Validators.required])
  });


  ngOnInit(): void {
    this.resService.presentLoader()
    this.getChartData()
    this.getData()
  }


  async getChartData(){
    
    const res = this.resService

    this.dataChartsSub = forkJoin([this.charts.getTotalPassengers('today'),this.charts.getAveragePassengersByTimeToday(),this.resService.getDevicesGPS(),this.charts.getTotalActiveMachinesToday()]).
    subscribe(([res1,res2,{data},res4])=>{
      console.log('Statistics Today',[res1,res2,data,])

      //Total de pasajeros 
      this.totalPassengers =(res == null) ?  '0' : res1['total_pasajeros']
      //Promedio de Pasajeros
      this.averagePassengers = (res2.length == 0) ?  '0':this.calculateAverage(res2.map(item=>+item.promedio_pasajeros)).replace('.',',')
      //Total de Buses
      this.totalMachines = res4.length

      this.machines = data
      res.closeLoader()
    },(err)=>{console.log(err);res.closeLoader()})


    this.optionChart1 = await this.charts.setOptionsChartsBoardingPassengers()
    this.optionChart2 = await this.charts.setOptionsChartsBarDisembarkationPassengers()
    
   }

  getData() {

    let dataFake = [{ machine: '3344 (BB-CL-34)', time: `1:00:42`, route: 'Portillo - Estadio San Carlo' }]
    for (let index = 1; index < 11; index++) {
      dataFake.push({ machine: '3344 (BB-CL-34)', time: `${index}:00:42`, route: 'Portillo - Estadio San Carlo'})
    }

    this.dataSource = new MatTableDataSource(dataFake);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

  }

  async filterData(date:'today'|'this_week'|'this_month'){

    document.getElementById('btnAccordion2')?.click()
    this.resService.presentLoader()

    const renderData = (res:TotalPasajeros,res2:PromedioPasajeros[],res3:any,res4:any) =>{
      this.totalPassengers = (res == null) ?  '0' : res.total_pasajeros
      this.averagePassengers = (res2.length == 0) ?  '0' : this.calculateAverage(res2.map(item=>+item.promedio_pasajeros)).replace('.',',')
      this.optionChart1 = res3
      this.optionChart2 = res4
      this.resService.closeLoader()
    }


    if (date == 'today') {
      Promise.all([this.charts.getTotalPassengers(date).toPromise(),this.charts.getAveragePassengersByTimeToday().toPromise(),this.charts.setOptionsChartsBoardingPassengers(),
        this.charts.setOptionsChartsBarDisembarkationPassengers()])
      .then(([res,res2,res3,res4])=>{

        renderData(res,res2,res3,res4)
      
      })
    }

    if (date == 'this_week') {
      Promise.all([this.charts.getTotalPassengers(date).toPromise(),this.charts.getAveragePassengersByDay(date).toPromise(),this.charts.setOptionsChartsBoardingPassengers(date),this.charts.setOptionsChartsBarDisembarkationPassengers(date)])
      .then(([res,res2,res3,res4])=>{
        renderData(res,res2,res3,res4)
      })
      
    }

    if (date == 'this_month') {
      Promise.all([this.charts.getTotalPassengers(date).toPromise(),this.charts.getAveragePassengersByDay(date).toPromise(),this.charts.setOptionsChartsBoardingPassengers(date),this.charts.setOptionsChartsBarDisembarkationPassengers(date)])
      .then(([res,res2,res3,res4])=>{
        renderData(res,res2,res3,res4)
      })
    }

  }

  filterByDatePicker(){
    
    this.resService.presentLoader()
    let params = this.rangeDatePicker.value

    params.start_date = moment(params.start_date).format("YYYY-MM-DD")
    params.end_date = moment(params.end_date).format("YYYY-MM-DD")
    params.startTime = (params.startTime.indexOf(':59')> 0) ? params.startTime : params.startTime + ':59'  
    params.endTime =  (params.endTime.indexOf(':59')> 0) ? params.endTime : params.endTime + ':59'
   
    /* console.log(params) */

    const start_date = params.start_date+' '+params.startTime
    const end_date = params.end_date+' '+params.endTime
    
    console.log(start_date, end_date)

    Promise.all([this.charts.getTotalPassengersByRangeDate(start_date,end_date).toPromise(),
      this.charts.getAveragePassengersByDayByRange(start_date,end_date).toPromise(),
      this.charts.setOptionsChartsBoardingPassengers(undefined,start_date,end_date),
      this.charts.setOptionsChartsBarDisembarkationPassengers(undefined,start_date,end_date),
    ])
     .then(([res1,res2,res3,res4])=>{
       this.totalPassengers = res1.total_pasajeros
       this.averagePassengers = this.calculateAverage(res2.map(item=>+item.promedio_pasajeros)).replace('.',',')
       this.optionChart1 = res3
       this.optionChart2 = res4
       this.resService.closeLoader()
     })

    document.getElementById('btnAccordion2')?.click()

  }

  machinePick(picked:MachineGPS){
    this.machinePicked = `${picked.name} (${picked.plate})`
    this.charts.plate = picked.plate // para filtrar toda la data por numero de placa de bus
    document.getElementById('btnAccordion3')?.click()
  }

  restore(){
    this.machinePicked = undefined
    this.charts.plate = undefined
    document.getElementById('btnAccordion3')?.click()
  }


  datePicker(){
    /* console.log(this.rangeDatePicker.value) */
  }

  hoverFilters(personalizado:HTMLElement){
    personalizado.classList.add('hover-filters')
  }

  //Calcular Promedio pasando un array de numeros como data
  calculateAverage = (data:Array<number>) => (data.reduce((prev, current) => prev + current, 0) / data.length).toFixed(2)
  

  async exportData(){
    this.resService.presentLoader()
    //Para exportar a PDF las graficas
    let DATA = document.getElementById('htmlData')!;
    
    await html2canvas(DATA).then(canvas => {
        
        /* let fileWidth = 290;
        let fileHeight = canvas.height * fileWidth / canvas.width; */
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('l', 'pt', 'a4');
        let position = 0; 
        let pageSize = PDF.internal.pageSize
        PDF.addImage(FILEURI, 'PNG', 0, position, pageSize.getWidth(), pageSize.getHeight() )
        
        PDF.save('estadisticas.pdf');
    });  
    //Para exportar a PDF las graficas

    //Exporta a Excel
    const props:any = {
      'time':'Hora de Salida', 
      'machine':'Nro. Máquina / Patente', 
      'route':'Ruta', 
    }

    const dataForXLSX = this.dataSource.data.map((itemObject)=>{

      let object:any = {}
      for (const property in itemObject) {

        if (props.hasOwnProperty(property)) {

          object[props[property]] = itemObject[property]

        } else {
          object[property] = itemObject[property]

        }
      }
      
      return object
    })
   /*  console.log(dataForXLSX); */

    const workSheet = XLSX.utils.json_to_sheet(dataForXLSX, { header: ['Hora de Salida','Nro. Máquina / Patente','Ruta'] })
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Maquinas');
    XLSX.writeFile(workBook, 'report.xlsx');
    this.resService.closeLoader()
  }

  ngOnDestroy(){
    if (this.dataChartsSub) {
      this.dataChartsSub.unsubscribe()
    }
  }

}
