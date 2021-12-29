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
      this.authServ.signInGPS().subscribe((resp)=>{
        console.log(resp)
      })
    }
  }

}
