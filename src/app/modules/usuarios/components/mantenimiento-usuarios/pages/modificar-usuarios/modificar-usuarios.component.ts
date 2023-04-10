import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseBackInterface } from '../../../../../../shared/interfaces/ResponseBack.interfaces';
import { NavigationExtras } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioInterface } from '../../../../../auth/interfaces/Usuario.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataUsuarios } from '../../interfaces/DialogDataUsuarios.interfaces';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class ModificarUsuariosComponent {
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z0-9ñ._-]*$/;

  constructor(private service:UsuariosService ,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService, 
              private dialogRef: MatDialogRef<ModificarUsuariosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataUsuarios ){}
  usuario: UsuarioInterface = this.data.parametro;

  usuariosUp = new FormGroup({
    nombres: new FormControl(this.usuario.nombres,Validators.required),
    apellidos: new FormControl(this.usuario.apellidos,Validators.required),
    usuario: new FormControl(this.usuario.usuario,Validators.required),
    password: new FormControl(this.usuario.password,Validators.required),
    correo: new FormControl(this.usuario.correo,Validators.required),
  });

  verificar() {
    if (this.usuariosUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea modificar los datos de '+this.usuario.nombres+' '+this.usuario.apellidos,
        header: 'Advertencia',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modificar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique los datos antes de modificar.'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Datos no modificados.' });
                    break;
            }
        }
    });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar todos los campos.' });
    }
  }
  
  
  modificar(){
    const Transaccion = "MODIFICAR_USUARIOS";
    let objToSend: NavigationExtras = {
      queryParams: {
        Id: this.usuario.id,
        Nombres: this.usuariosUp.value.nombres,
        Apellidos: this.usuariosUp.value.apellidos,
        Usuario: this.usuariosUp.value.usuario,
        Password: this.usuariosUp.value.password,
        Correo: this.usuariosUp.value.correo,
        Transaccion : Transaccion
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.updData(objToSend.queryParams as UsuarioInterface).subscribe((data:ResponseBackInterface) =>{
      this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
    }),(error: HttpErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.respuesta , detail: error.error.leyenda });
      
    };
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }

  limpiar(){
    this.usuariosUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
