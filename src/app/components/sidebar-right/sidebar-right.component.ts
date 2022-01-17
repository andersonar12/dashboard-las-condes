import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { GeoZonesService } from '@SERVICES/geo-zones.service'
import { EChartsOption } from 'echarts'
import * as moment from 'moment'

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

  public topGeoZones: TTopGeoZone[] = []

  constructor(public charts: ChartsService, public dialog: MatDialog, private geoZoneService: GeoZonesService) {}

  ngOnInit(): void {
    this.pushbar = new Pushbar({ blur: false, overlay: false })
    this.getData()
  }

  private async getData(): Promise<void> {
    const geoZones = await this.geoZoneService.getTopGeoZones({
      top: 5,
      date: moment().format('YYYY-MM-DD')
    })

    const topGeoZones = geoZones?.map(geoZone => {
      const { geozone, entradas } = geoZone

      return <TTopGeoZone>{
        ...this.descomponentGeoZone(geozone),
        passengers: entradas.toString()
      }
    })

    this.topGeoZones = topGeoZones || []
  }

  private descomponentGeoZone(geozone: string): { code: string; name: string } {
    const strList = geozone.split('-')

    return strList.length === 2
      ? {
          code: strList[0].trim(),
          name: strList[1]
        }
      : {
          code: '',
          name: strList[0].trim()
        }
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
