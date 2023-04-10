import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ClientesInterface } from '../../interfaces/Clientes.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataClientes } from '../../interfaces/DialogDataClientes.interfaces';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ClientesService } from '../../services/clientes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseBackInterface } from '../../../../../../shared/interfaces/ResponseBack.interfaces';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces copy';

@Component({
  selector: 'app-modificar-clientes',
  templateUrl: './modificar-clientes.component.html',
  styleUrls: ['./modificar-clientes.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class ModificarClientesComponent implements OnInit{
  
  maxDate: Date;
  minDate: Date;
  dateFormat: string = 'dd/mm/yy';
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z 0-9ñ,.-]*$/;

  constructor(private service:ClientesService ,private confirmationService: ConfirmationService, private messageService: MessageService,private router: Router,private dialogRef: MatDialogRef<ModificarClientesComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogDataClientes ){
    const hoyMenos100Anios = new Date();

    // Obtener la fecha actual dentro de 10 años
    const hoyMas10Anios = new Date();

    // Establecer las fechas mínima y máxima permitidas
    this.minDate = hoyMenos100Anios;
    this.maxDate = hoyMas10Anios;
  
  }
  cliente: ClientesInterface = this.data.parametro;
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

  clienteUp = new FormGroup({
    cedula: new FormControl(this.cliente.cedula,Validators.required),
    nombres: new FormControl(this.cliente.nombres,Validators.required),
    apellidos: new FormControl(this.cliente.apellidos,Validators.required),
    fechaNacimiento: new FormControl(this.cliente.fechaNacimiento,Validators.required),
    direccion: new FormControl(this.cliente.direccion,Validators.required),
    numero: new FormControl(this.cliente.numero,Validators.required),
    correo: new FormControl(this.cliente.correo,Validators.required),
  });

  verificar() {
    if (this.clienteUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea modificar los datos de '+this.cliente.nombres+' '+this.cliente.apellidos,
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
    const Transaccion = "MODIFICAR_CLIENTES";
    const datePipe = new DatePipe('en-US');
    let formatoFecha;
    if (typeof this.clienteUp.value.fechaNacimiento === 'string') {
      formatoFecha = this.clienteUp.value.fechaNacimiento;
    } else {
      formatoFecha = datePipe.transform(this.clienteUp.value.fechaNacimiento, 'dd/MM/yyyy');
    }
    let objToSend: NavigationExtras = {
      queryParams: {
        Id: this.cliente.id,
        Nombres: this.clienteUp.value.nombres,
        Apellidos: this.clienteUp.value.apellidos,
        FechaNacimiento: formatoFecha,
        Direccion: this.clienteUp.value.direccion,
        Numero: this.clienteUp.value.numero,
        Correo: this.clienteUp.value.correo,
        Transaccion : Transaccion
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.updData(objToSend.queryParams as ClientesInterface).subscribe((data:ResponseBackInterface) =>{
      this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
    }),(error: BackErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.respuesta , detail: error.error.leyenda });
      
    };
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  limpiar(){
    this.clienteUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
