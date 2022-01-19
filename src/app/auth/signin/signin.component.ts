import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

import { AuthService } from '@SERVICES/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public formGroup!: FormGroup

  constructor(private _formBuilder: FormBuilder, private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.formGroup = this._formBuilder.group(
      {
        email: ['', [Validators.email, Validators.minLength(6), Validators.maxLength(40)]],
        password: ['', [Validators.minLength(6), Validators.maxLength(30)]]
      },
      {
        validators: Validators.required
      }
    )
  }

  public async signIn(): Promise<void> {
    this.presentLoader()
    const login = this.formGroup.value as TLogin

    try {
      await this.authService.signIn(login)
      this.router.navigateByUrl('/pages/home')
    } catch (errorMessage) {
      alert('ERROR: ' + errorMessage)
      this.formGroup.reset()
    } finally {
      Swal.close()
    }
  }

  private presentLoader(): void {
    Swal.fire({
      heightAuto: false,
      title: 'Cargando',
      allowOutsideClick: false,
      allowEscapeKey: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }
}
