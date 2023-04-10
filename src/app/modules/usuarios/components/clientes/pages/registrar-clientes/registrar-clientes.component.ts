import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClientesInterface } from '../../interfaces/Clientes.interfaces';
import { DatePipe } from '@angular/common';
import { ResponseBackInterface } from '../../../../../../shared/interfaces/ResponseBack.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces copy';

@Component({
  selector: 'app-registrar-clientes',
  templateUrl: './registrar-clientes.component.html',
  styleUrls: ['./registrar-clientes.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RegistrarClientesComponent implements OnInit{
  maxDate: Date;
  minDate: Date;
  dateFormat: string = 'dd/mm/yy';
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z 0-9ñ,.-]*$/;

  registros = new FormGroup({
    cedula: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    apellidos: new FormControl('',Validators.required),
    fechaNacimiento: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    numero: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    transaccion: new FormControl()
  })

  constructor(private service:ClientesService, private confirmationService:ConfirmationService, private messageService:MessageService){
    const hoyMenos100Anios = new Date();

    // Obtener la fecha actual dentro de 10 años
    const hoyMas10Anios = new Date();

    // Establecer las fechas mínima y máxima permitidas
    this.minDate = hoyMenos100Anios;
    this.maxDate = hoyMas10Anios;
  }

  ngOnInit(){

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    this.minDate = new Date();
    this.minDate.setMonth(month);
    this.minDate.setFullYear(year - 112);
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    this.maxDate.setFullYear(year - 12);
  }
  agregar() {
    this.confirmationService.confirm({
        message: '¿Esta seguro que desea agregar el Cliente?',
        header: 'Advertencia',
        icon: 'pi pi-plus',
        accept: () => {
          //this.messageService.add({severity: 'success', summary: 'Exitoso', detail: 'Cliente agregado exitosamente' });
          this.onSubmit();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Atencion', detail: 'Verifica tus datos antes de ingresarlos'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Rechazado', detail: 'Accion denegada, intente de nuevo' });
                    break;
            }
        }
    });
  }

  onSubmit()
  {
    this.registros.value.transaccion = "INSERTAR_CLIENTES";
    const dataPipe = new DatePipe('en-US');
    const formatoFecha = dataPipe.transform(this.registros.value.fechaNacimiento,'dd/MM/yyyy');
          let objToSend: NavigationExtras = {
            queryParams: {
              Cedula: this.registros.value.cedula,
              nombres: this.registros.value.nombres,
              apellidos: this.registros.value.apellidos,
              FechaNacimiento: formatoFecha,
              Direccion: this.registros.value.direccion,
              Numero: this.registros.value.numero?.toString(),
              Correo: this.registros.value.correo,
              Transaccion: this.registros.value.transaccion
            },
            skipLocationChange: false,
            fragment: 'top' 
          };
          this.service.setData(objToSend.queryParams as ClientesInterface).subscribe((data:ResponseBackInterface) =>{  
          this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
          }),
          (error: BackErrorResponse) => {

            this.messageService.add({ severity: 'error', summary: error.error.respuesta, detail:  error.error.respuesta });
          };
  }

  limpiar(){

    this.registros.reset();
  }
}
