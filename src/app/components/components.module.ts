import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MachineModalComponent } from './machine-modal/machine-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { TableGeneralComponent } from './table-general/table-general.component';

@NgModule({
  declarations: [MachineModalComponent, TableGeneralComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [ TableGeneralComponent ]
})
export class ComponentsModule { }
