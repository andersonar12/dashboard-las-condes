import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MachineModalComponent } from './machine-modal/machine-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { TableGeneralComponent } from './table-general/table-general.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';

@NgModule({
  declarations: [MachineModalComponent, TableGeneralComponent, SidebarRightComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  exports: [ TableGeneralComponent,SidebarRightComponent ]
})
export class ComponentsModule { }
