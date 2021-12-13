import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ChartsService } from '../../services/charts.service';
import * as echarts from 'echarts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

}
