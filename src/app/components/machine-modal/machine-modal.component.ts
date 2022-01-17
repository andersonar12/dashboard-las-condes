import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import * as moment from 'moment'

import { GeoZonesService } from '@SERVICES/geo-zones.service'

@Component({
  selector: 'app-machine-modal',
  templateUrl: './machine-modal.component.html',
  styleUrls: ['./machine-modal.component.scss']
})
export class MachineModalComponent implements OnInit {
  public passengers: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TMachineModalData,
    public dialogRef: MatDialogRef<MachineModalComponent>,
    private geoZonesService: GeoZonesService
  ) {}

  public exportXLSX!: Function
  public geoZones: TGeoZone[] = []
  public busFields: TTableField[] = [
    { key: 'date', label: 'Fecha', wch: 10 },
    { key: 'time', label: 'Hora', wch: 10 },
    // { key: 'route', label: 'Ruta', wch: 25 },
    { key: 'geozone', label: 'Paradero', wch: 25 },
    { key: 'pasajeros', label: 'Cant. de pasajeros', wch: 20 }
  ]

  ngOnInit(): void {
    this.getData()
  }

  async getData() {
    const body: TBodyAforo['busReport'] = {
      plate: this.data.machine.plate,
      date: moment().format('YYYY-MM-DD')
    }

    const busReportList = await this.geoZonesService.getBusReport(body)

    const geoZones = busReportList?.map(busReport => {
      const { date, geozone, pasajeros } = busReport

      this.passengers += this.passengers + pasajeros

      return <TGeoZone>{
        date: moment(date).format('YY-MM-DD'),
        time: moment(date).format('HH:mm:ss'),
        route: '',
        geozone,
        pasajeros: pasajeros.toString()
      }
    })

    this.geoZones = geoZones || []
  }
}
