import { Component, OnInit,OnDestroy, Inject, ViewChild, } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-machine-modal',
  templateUrl: './machine-modal.component.html',
  styleUrls: ['./machine-modal.component.scss']
})
export class MachineModalComponent implements OnInit {


  public displayedColumns: string[] = ['date', 'time', 'route', 'bus_stop', 'passengers'];
  public dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<MachineModalComponent>) { }

  ngOnInit(): void {
    this.getData()

  }

   getData() {
    let dataFake = [{ date: '22-04-21', time: '13:00:42', route: 'Portillo - Estadio San Carlo', bus_stop: 'PC1254 Av. Manquehue Sur / Esq. Avenida Apoquindo', passengers: '35' }]

    for (let index = 0; index < 8; index++) {
      dataFake.push({ date: `2${index}-04-21`, time: '13:00:42', route: 'Portillo - Estadio San Carlo', bus_stop: 'PC1254 Av. Manquehue Sur / Esq. Avenida Apoquindo', passengers: '50' })
    }

    this.dataSource = new MatTableDataSource(dataFake);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

  }

  /* ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0 );
  } */

  exportData(){

    //Exporta a Excel
    const props:any = {
      'date':'Fecha',
      'time':'Hora', 
      'route':'Ruta', 
      'bus_stop':'Paradero', 
      'passengers':'Cant. de pasajeros'
    }
 

    const dataForXLSX = this.dataSource.data.map((itemObject)=>{

      let object:any = {}

      for (const property in itemObject) {

        if (props.hasOwnProperty(property)) {

          object[props[property]] = itemObject[property]

        } else {

          object[property] = itemObject[property]

        }

      }
      
      return object
    })
    console.log(dataForXLSX);

    const workSheet = XLSX.utils.json_to_sheet(dataForXLSX, { header: ['Fecha','Hora','Ruta','Paradero', 'Cant. de pasajeros'] })
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Maquina');
    XLSX.writeFile(workBook, 'report.xlsx');
  }

}
