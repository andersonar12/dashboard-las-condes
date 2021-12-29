import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsService } from '../../services/charts.service';
import * as echarts from 'echarts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MachineModalComponent } from '../../components/machine-modal/machine-modal.component';
import { MapService } from '../../services/map.service';
import { AgmMarker } from '@agm/core';
import { ResourcesService } from '../../services/resources.service';
import { MachineGPS } from '../../interfaces/interfaces';

declare var Pushbar: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('aside') aside!: ElementRef

  public pushbar:any
  public machines!:MachineGPS[]
  public markers = ['1597','1729','1730','1731','1732','1733','1735','1736']
  public map: any;
  public zoom = 14;
  public lat= -33.40904396097648 //Para centralizar el mapa en Las Condes
  public lng= -70.56714105961915//Para centralizar el mapa en Las Condes
  public latClickMap!:number
  public lngClickMap!:number
  public optionChart1!:EChartsOption
  public optionChart2!:EChartsOption
  public optionChart3!:EChartsOption

  public rangeDatePicker = new FormGroup({
    start:    new FormControl('',[Validators.required]),
    startTime:new FormControl('',[Validators.required]),
    end:      new FormControl('',[Validators.required]),
    endTime:  new FormControl('',[Validators.required])
  });

  public showToogle = false
  public showMachineList = true
  public showBusStopsMarkers = false

  constructor(private cd: ChangeDetectorRef, public charts:ChartsService,public mapService:MapService, public resService: ResourcesService ,public dialog: MatDialog) { }

  ngOnInit() {
    this.pushbar = new Pushbar({ blur: false, overlay: false });
    this.resService.presentLoader()
    this.getDevicesGPS()
    this.getChartData()

    // este metodo es del API de Google Maps te permite consultar direcciones pasandole lat y lng 
   
    this.mapService.getAddress(-33.40904396097648, -70.56714105961915).subscribe((resp) => {
      console.log(resp)
      this.latClickMap = -33.40904396097648
      this.lngClickMap = -70.56714105961915
    }, (e) => console.log(e))
    // este metodo es del API de Google Maps te permite consultar direcciones pasandole lat y lng 
  }

  getDevicesGPS(){
    this.resService.getDevicesGPS().toPromise()
      .then(({data})=>{
        let index = 0
        this.machines = data.map((machine)=>{

          if (index >= this.markers.length){ 
            index = 0
            machine.marker = this.markers[index]
          } else {
            machine.marker = this.markers[index]
          }
          index++

          return machine
        })
        console.log(this.machines)
        this.resService.closeLoader()
      })
  }

  getChartData(){
   this.optionChart1 = this.charts.setOptionsChartsPassengers()
   this.optionChart2 = this.charts.setOptionsChartsBusesInRoute()
   this.optionChart3 = this.charts.setOptionsChartsAverageRise()
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
