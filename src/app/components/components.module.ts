import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { NgxEchartsModule } from 'ngx-echarts'
import * as echarts from 'echarts'

// COMPONENTS
import { MachineModalComponent } from './machine-modal/machine-modal.component'
import { TableGeneralComponent } from './table-general/table-general.component'
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component'

// OTHERS
import { GeozonePipe } from '@PIPES/geozone.pipe'

@NgModule({
  declarations: [MachineModalComponent, TableGeneralComponent, SidebarRightComponent, GeozonePipe],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  exports: [TableGeneralComponent, SidebarRightComponent]
})
export class ComponentsModule {}
