import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MachineGPS } from '../../interfaces/interfaces';
import { MachineModalComponent } from '../machine-modal/machine-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChartsService } from '../../services/charts.service';
import { EChartsOption } from 'echarts';

declare var Pushbar: any

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
  
  /* @ViewChild('aside') aside!: ElementRef */
  @Input() machines:MachineGPS[] = []
  @Input() optionChart!:EChartsOption
  @Output() plateBusEmit: EventEmitter<string> = new EventEmitter()

  public showToogle = false
  public showMachineList = true
  public pushbar:any

  constructor(public charts:ChartsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pushbar = new Pushbar({ blur: false, overlay: false });
  }

  openMachineDetailModal(){
    this.dialog.open(MachineModalComponent, {
      width: '1200px',
      /* disableClose: true, */
    })
  }
  
  //TODO: hay un toggle en el sidebar segun la propuesta grafica, aqui se obtiene boolean al hacer click sobre el
  slideToggle(event:any){
    console.log(event.checked)
  }


}
