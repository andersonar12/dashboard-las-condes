import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { LiveGpsInterceptorService } from '@SERVICES/interceptors/liveGps.interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    { provide: HTTP_INTERCEPTORS, useClass: LiveGpsInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
