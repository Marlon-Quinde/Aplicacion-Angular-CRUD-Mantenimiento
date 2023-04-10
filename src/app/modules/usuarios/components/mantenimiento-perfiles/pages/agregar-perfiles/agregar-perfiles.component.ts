import { Component } from '@angular/core';
import { PerfilesService } from '../../services/perfiles.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { PerfilesInterfaces } from '../../interfaces/Perfiles.interfaces';
import { ResponseBackInterface } from 'src/app/shared/interfaces/ResponseBack.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-perfiles',
  templateUrl: './agregar-perfiles.component.html',
  styleUrls: ['./agregar-perfiles.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class AgregarPerfilesComponent {
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z0-9ñ._-]*$/;

  constructor(private service:PerfilesService ,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService,
              private dialogRef: MatDialogRef<AgregarPerfilesComponent> ){}

  perfilUp = new FormGroup({
    descripcion: new FormControl('',Validators.required),
  });

  verificar() {
    if (this.perfilUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea agregar este perfil ? ',
        header: 'Advertencia',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modificar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique antes de agregar.'});
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
    const Transaccion = "INSERTAR_PERFILES";
    let objToSend: NavigationExtras = {
      queryParams: {
        Descripcion: this.perfilUp.value.descripcion,
        Transaccion : Transaccion
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.setData(objToSend.queryParams as PerfilesInterfaces).subscribe((data:ResponseBackInterface) =>{
      this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
    }),(error: HttpErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.respuesta , detail: error.error.leyenda });
      
    };
  }

  limpiar(){
    this.perfilUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
