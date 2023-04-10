import { Component, Inject } from '@angular/core';
import { PerfilesService } from '../../services/perfiles.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDataPerfiles } from '../../interfaces/DialogDataPerfiles.interfaces';
import { PerfilesInterfaces } from '../../interfaces/Perfiles.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { ResponseBackInterface } from 'src/app/shared/interfaces/ResponseBack.interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modificar-perfiles',
  templateUrl: './modificar-perfiles.component.html',
  styleUrls: ['./modificar-perfiles.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class ModificarPerfilesComponent {

  constructor(private service:PerfilesService ,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService, 
              private dialogRef: MatDialogRef<ModificarPerfilesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataPerfiles ){}
  perfil: PerfilesInterfaces = this.data.parametro;

  perfilUp = new FormGroup({
    descripcion: new FormControl(this.perfil.descripcion,Validators.required),
  });

  verificar() {
    if (this.perfilUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea modificar los datos del perfil "'+this.perfil.descripcion+'"? ',
        header: 'Advertencia',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modificar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique antes de modificar.'});
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
    const Transaccion = "MODIFICAR_PERFILES";
    let objToSend: NavigationExtras = {
      queryParams: {
        Id: this.perfil.id,
        Descripcion: this.perfilUp.value.descripcion,
        Transaccion : Transaccion
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.updData(objToSend.queryParams as PerfilesInterfaces).subscribe((data:ResponseBackInterface) =>{
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
    this.perfilUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
