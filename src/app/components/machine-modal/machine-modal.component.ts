import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

import { GeoZonesService } from '@SERVICES/geo-zones.service'

@Component({
  selector: 'app-machine-modal',
  templateUrl: './machine-modal.component.html',
  styleUrls: ['./machine-modal.component.scss']
})
export class MachineModalComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'time', 'route', 'bus_stop', 'passengers']
  public dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MachineModalComponent>,
    private geoZonesService: GeoZonesService
  ) {}

  public geoZones: object[] = []
  public busFields: TTableField[] = [
    {
      key: 'date',
      label: 'Fecha'
    },
    {
      key: 'time',
      label: 'Hora'
    },
    {
      key: 'route',
      label: 'Ruta'
    },
    {
      key: 'geozone',
      label: 'Paradero'
    },
    {
      key: 'pasajeros',
      label: 'Cant. de pasajeros'
    }
  ]
  public exportXLSX!: Function

  ngOnInit(): void {
    this.getData()
  }

  async getData() {
    const dataList = await this.geoZonesService.getReportBuses({} as TBodyAforo['busReport'])

    const geoZones = dataList!.map(data => {
      const date = data.date as string

      return {
        ...data,
        date: date.substring(0, date.search('T')),
        time: date.substring(11, date.search(/\./)),
        route: '',
        geozone: data.geozone,
        pasajeros: data.pasajeros.toString()
      }
    })

    this.geoZones = geoZones
  }
}
