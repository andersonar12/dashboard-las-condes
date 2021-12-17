import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsService } from '../../services/charts.service';
import * as echarts from 'echarts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MachineModalComponent } from '../../components/machine-modal/machine-modal.component';
import { MapService } from '../../services/map.service';
import { AgmMarker } from '@agm/core';

declare var Pushbar: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('aside') aside!: ElementRef

  public pushbar:any
  
  public map: any;
  public zoom = 14;
  public lat= -33.4233405
  public lng= -70.5896287
  public latClickMap!:number
  public lngClickMap!:number
  public optionChart1!:EChartsOption
  public optionChart2!:EChartsOption
  public optionChart3!:EChartsOption

  public rangeDatePicker = new FormGroup({
    start: new FormControl('',[Validators.required]),
    startTime:new FormControl('',[Validators.required]),
    end: new FormControl('',[Validators.required]),
    endTime: new FormControl('',[Validators.required])
  });

  public showToogle = false
  public showMachineList = true
  public showBusStopsMarkers = false

  constructor(private cd: ChangeDetectorRef, public charts:ChartsService,public mapService:MapService,private dialog: MatDialog) { }

  ngOnInit() {
   this.pushbar = new Pushbar({ blur: false,overlay: false	});
   this.optionChart1 = this.charts.setOptionsChartsPassengers()
   this.optionChart2 = this.charts.setOptionsChartsBusesInRoute()
   this.optionChart3 = this.charts.setOptionsChartsAverageRise()

   this.mapService.getAddress(-33.42306921900215,-70.59553742408752).subscribe((resp)=>{
    console.log(resp)

    this.latClickMap = -33.42327741243925
    this.lngClickMap = -70.59482395648956
    
   },(e)=>console.log(e))
  }

  openMachineDetailModal(){
    this.dialog.open(MachineModalComponent, {
      width: '1200px',
      /* disableClose: true, */
    })
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

  slideToggle(event:any){
    console.log(event.checked)
  }

  showBusStops(){
    this.showBusStopsMarkers = true
    this.showToogle = true
  }

  hideBusStops(){
    this.showBusStopsMarkers=false 
    this.showToogle = false
  }

  public mapReady(map:any) {
    this.map = map;
  }

/* Evento click en cualquier parte del mapa */
  seeCoords(event:any) { 
    console.log(event)
    this.latClickMap = event.coords.lat
    this.lngClickMap = event.coords.lng
  }

  ngOnDestroy(){
    /* this.aside.nativeElement.style.display = 'none' */
  }

  
}
