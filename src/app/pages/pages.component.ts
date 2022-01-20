import { Component } from '@angular/core'

import { AuthService } from '@SERVICES/auth.service'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {
  constructor(public authService: AuthService) {}
}
