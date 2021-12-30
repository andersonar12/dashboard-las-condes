import { Component, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(public authServ:AuthService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('tokenLiveGPS')) {
      this.authServ.signInGPS().toPromise().then((resp)=>{
        console.log(resp)
      }).catch((e)=>{
        console.log(e)
        alert('ha ocurrido error al iniciar sesion en Live GPS')
        window.location.reload()
      }
      )
    }
  }

}
