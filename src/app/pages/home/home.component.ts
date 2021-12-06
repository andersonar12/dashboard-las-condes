import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  lat= -34.18780581852565
  lng= -70.71971778490841

  constructor() { }

  ngOnInit(): void {
  }

}
