import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { AgmCoreModule } from '@agm/core'
import { NgxEchartsModule } from 'ngx-echarts'
import * as echarts from 'echarts'

import { PagesRoutes } from './pages.routing'
import { ComponentsModule } from '../components/components.module'
import { environment } from '../../environments/environment'

// COMPONENTS
import { PagesComponent } from './pages.component'
import { HomeComponent } from './home/home.component'
import { StatisticsComponent } from './statistics/statistics.component'

const Components = [PagesComponent, HomeComponent, StatisticsComponent]

@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    ComponentsModule,
    NgxEchartsModule.forRoot({ echarts }),
    AgmCoreModule.forRoot({ apiKey: environment.APIGoogleMaps }),
    RouterModule.forChild(PagesRoutes)
  ]
})
export class PagesModule {}
