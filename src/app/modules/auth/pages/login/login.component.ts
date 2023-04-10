import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UsuarioInterface } from '../../interfaces/Usuario.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent {
  hide = true;
  usuarioTemp: string = '';
  constructor(private MessageService: MessageService,private service: AuthService, private router: Router) { }

  sesionControl = new FormGroup({
    Usuario: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
    Transaccion: new FormControl()
  })

  onSubmit(){
    this.sesionControl.value.Transaccion="VALIDAR_ACCESO";
    this.usuarioTemp = this.sesionControl.value.Usuario!;

    this.service.login(this.sesionControl.value as UsuarioInterface).subscribe((data:any) =>{
      console.log(data);
      localStorage.setItem('userName',this.usuarioTemp);
      localStorage.setItem('token_value',data);
      this.router.navigate(['../home']);
      this.service.loggedIn.next(true);
    },
//    (errorData) => alert(JSON.stringify(errorData.error)))
    (errorData: HttpErrorResponse) => {
      this.MessageService.add({ severity: 'error', summary: errorData.error.respuesta , detail: errorData.error.leyenda });
    }
    )
  }  
}
