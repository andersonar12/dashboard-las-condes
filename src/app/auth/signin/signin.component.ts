import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public formGroup!: FormGroup;
  constructor(private _formBuilder: FormBuilder, private router:Router,public authService:AuthService) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm(){

    this.formGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password:['', Validators.required],

    });
  }

  signIn(){
    this.presentLoader()

    localStorage.setItem('token', JSON.stringify({token:'token_de_prueba'}));

    Promise.all([this.authService.signInGPS().toPromise()])
    .then(([resp]) => {
      this.router.navigateByUrl('/pages/home')
    }).catch((e) => {
      /* alert(`Error Live GPS, ${e}`); */
      Swal.close();
    });

    return
    this.authService.signIn(this.formGroup.value).toPromise().then((resp)=>{
      // TODO: crear signIn
    }).catch(async (error)=>{
      const errorMsg = await error.error.error
    })
  }


  presentLoader(){
    Swal.fire({
      heightAuto: false,
      title: 'Cargando',
      allowOutsideClick: false,
      allowEscapeKey:false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }


}
