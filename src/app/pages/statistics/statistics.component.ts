import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ChartsService } from '../../services/charts.service';
import * as echarts from 'echarts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public optionChart1!:EChartsOption
  public optionChart2!:EChartsOption
  public displayedColumns: string[] = ['time','machine', 'route'];
  public dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private cd: ChangeDetectorRef, public charts:ChartsService) { }

  public rangeDatePicker = new FormGroup({
    start: new FormControl('',[Validators.required]),
    startTime:new FormControl('',[Validators.required]),
    end: new FormControl('',[Validators.required]),
    endTime: new FormControl('',[Validators.required])
  });


  ngOnInit(): void {

    this.optionChart1 = this.charts.setOptionsChartsBoardingAndDisembarkationPassengers()
    this.optionChart2 = this.charts.setOptionsChartsBarPassengers()
   this.getData()

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

  filter(){
    console.log(this.rangeDatePicker.value)
    document.getElementById('btnAccordion2')?.click()
  }

  datePicker(){
    console.log(this.rangeDatePicker.value)
  }

  hoverFilters(personalizado:HTMLElement){
    personalizado.classList.add('hover-filters')
  }

  exportData(){

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
    console.log(dataForXLSX);

    const workSheet = XLSX.utils.json_to_sheet(dataForXLSX, { header: ['Hora de Salida','Nro. Máquina / Patente','Ruta'] })
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Maquinas');
    XLSX.writeFile(workBook, 'report.xlsx');
  }

}
