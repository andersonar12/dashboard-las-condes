import { Component, Input, OnInit, Output, ViewChild, EventEmitter, SimpleChange } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import * as XLSX from 'xlsx'
import * as moment from 'moment'

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit {
  @Input() name: string = ''
  @Input() fields: TTableField[] = []
  @Input() items: any[] = [] // TODO: crear tipo de dato
  @Output() eventExportXLSX: EventEmitter<Function> = new EventEmitter()

  public displayedColumns: string[] = []
  public dataSource!: MatTableDataSource<any[]>
  public tableOptions: TTableOptions = {
    sortDirection: 'desc',
    pageSize: 10
  }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  constructor() {}

  ngOnInit(): void {
    moment.locale('es')
    this.dataSource = new MatTableDataSource(this.items)
    this.displayedColumns = this.fields.map(field => field.key)

    setTimeout(() => {
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }, 500)

    this.eventExportXLSX.emit(this.exportXLSX(this.fields))
  }

  ngOnChanges(changes: TChanges<any[]>): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    // TODO: create loading para mostrar mientras los datos llegan

    // FIXME: corregir error "TypeError: Cannot set properties of undefined (setting 'data')"
    this.dataSource.data = changes.items.currentValue
  }

  private exportXLSX(fields: TTableField[]): Function {
    let props: any = {}

    fields.forEach(field => {
      props[field.key] = field.label
    })

    const dataForXLSX = this.dataSource.data.map(itemObject => {
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
