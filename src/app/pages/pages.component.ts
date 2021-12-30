import { Component, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { ResourcesService } from '../services/resources.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(public authServ:AuthService, public resService: ResourcesService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('tokenLiveGPS')) {
      this.authServ.signInGPS().toPromise().then((resp)=>{
        console.log(resp)
      }).catch((e)=>{
        alert(`Error Live GPS, ${e.error}`)
        this.resService.closeLoader()
      }
      )
    }
  }

}
