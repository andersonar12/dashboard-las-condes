import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { EChartsOption } from 'echarts'

import { MachineGPS } from '../../interfaces/interfaces'
import { ChartsService } from '../../services/charts.service'
import { MachineModalComponent } from '../machine-modal/machine-modal.component'

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
  /* @ViewChild('aside') aside!: ElementRef */
  @Input() machines: MachineGPS[] = []
  @Input() optionChart!: EChartsOption
  @Output() plateBusEmit: EventEmitter<string> = new EventEmitter()

  public showToogle = false
  public showMachineList = true
  public pushbar: any

  constructor(public charts: ChartsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.pushbar = new Pushbar({ blur: false, overlay: false })
  }

  public openMachineDetailModal(machine: MachineGPS) {
    this.dialog.open(MachineModalComponent, {
      width: '1200px',
      data: { machine }
      /* disableClose: true, */
    })
  }

  public slideToggle(event: any) {
    //TODO: hay un toggle en el sidebar segun la propuesta grafica, aqui se obtiene boolean al hacer click sobre el
  }
}
