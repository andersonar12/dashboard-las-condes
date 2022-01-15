import { Component, Input, OnInit, OnChanges, Output, ViewChild, EventEmitter } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'

import * as moment from 'moment'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit, OnChanges {
  @Input() name: string = ''
  @Input() fields: TTableField[] = []
  @Input() items: object[] = []
  @Output() eventExportXLSX: EventEmitter<Function> = new EventEmitter()

  public displayedColumns: string[] = []
  public dataSource = new MatTableDataSource<TGeoZone>()
  public tableOptions: TTableOptions = {
    sortDirection: 'desc',
    pageSize: 10
  }
  public isLoading: boolean = true

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  constructor() {}

  ngOnInit(): void {
    moment.locale('es')
    this.displayedColumns = this.fields.map(field => field.key)

    setTimeout(() => {
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }, 500)

    this.eventExportXLSX.emit(this.exportXLSX(this.fields))
  }

  ngOnChanges(changes: TTableChanges<TGeoZone[]>): void {
    const { previousValue, currentValue } = changes.items

    if (previousValue) {
      this.dataSource.data = currentValue
      this.isLoading = false
    }
  }

  private exportXLSX(fields: TTableField[]): Function {
    let props: any = {}

    fields.forEach(field => {
      props[field.key] = field.label
    })

    const dataForXLSX = this.dataSource.data.map((itemObject: any) => {
      let object: any = {}
      for (const property in itemObject) {
        if (props.hasOwnProperty(property)) {
          object[props[property]] = itemObject[property]
        } else {
          object[property] = itemObject[property]
        }
      }

      return object
    })

    const workSheet = XLSX.utils.json_to_sheet(dataForXLSX, {
      header: fields.map(field => field.label)
    })

    // TODO: traer estos datos dinamicamente desde fields
    let wscols = [{ wch: 12 }, { wch: 20 }, { wch: 25 }]

    workSheet['!cols'] = wscols

    const workBook: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1')

    return () => XLSX.writeFile(workBook, `Reporte de ${this.name} - ${moment().format('DD MMMM YYYY HH.mm')}.xlsx`)
  }
}
