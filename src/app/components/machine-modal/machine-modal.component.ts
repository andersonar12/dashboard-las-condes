import { Component, OnInit,OnDestroy, Inject, ViewChild, } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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

}
