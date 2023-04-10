import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioInterface } from '../../../../../auth/interfaces/Usuario.interfaces';
import { ResponseBackInterface } from '../../../../../../shared/interfaces/ResponseBack.interfaces';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from '../../services/usuarios.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AgregarUsuariosComponent {
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z0-9ñ._-]*$/;

  constructor(private service:UsuariosService ,private confirmationService: ConfirmationService, private messageService: MessageService,private dialogRef: MatDialogRef<AgregarUsuariosComponent>){}
  //usuario: UsuarioInterface = [];

  usuario = new FormGroup({
    nombres: new FormControl('',Validators.required),
    apellidos: new FormControl('',Validators.required),
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
  });

  verificar() {
    if (this.usuario.valid) {
      this.confirmationService.confirm({
        message: '¿Desea agregar a '+this.usuario.value.nombres+' '+this.usuario.value.apellidos+' al sistema?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.agregar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique los datos primero.'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Datos no agregados.' });
                    break;
            }
        }
    });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar todos los campos.' });
    }
  }
  
  
  agregar(){
    const Transaccion = "INSERTAR_USUARIOS";
    let objToSend: NavigationExtras = {
      queryParams: {
        Nombres: this.usuario.value.nombres,
        Apellidos: this.usuario.value.apellidos,
        Usuario: this.usuario.value.usuario,
        Password: this.usuario.value.password,
        Correo: this.usuario.value.correo,
        Transaccion : Transaccion
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.setData(objToSend.queryParams as UsuarioInterface).subscribe((data:ResponseBackInterface) =>{
      this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
    }),(error: HttpErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.respuesta , detail: error.error.leyenda });
      
    };
  }


  limpiar(){
    this.usuario.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
