import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ClientesInterface } from '../../interfaces/Clientes.interfaces';
import { ConfirmationService, MessageService, ConfirmEventType  } from 'primeng/api';
import { ModificarClientesComponent } from '../modificar-clientes/modificar-clientes.component';

import { Table } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';
import { ClientesService } from '../../services/clientes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ResponseBackInterface } from '../../../../../../shared/interfaces/ResponseBack.interfaces';


@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.css'],
  providers: [DialogService, ConfirmationService, MessageService]
})

export class MostrarClientesComponent implements OnInit {
  clientes: ClientesInterface[] = [];
  clientesTrans = new FormGroup({
    transaccion: new FormControl()
  })
  
  constructor(private service:ClientesService, 
    private dialog: MatDialog ,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService, 
    public dialogService: DialogService,) { 
    }
    
    info: string = this.service.info;;

  ngOnInit(): void {
    this.mostrarTodos()
  }
  

  mostrarTodos(){
    //this.PacienteConsultar.value.Cedula="0943792499";
    this.clientesTrans.value.transaccion="MOSTRAR_CLIENTES"

    this.service.getData(this.clientesTrans.value as ClientesInterface).subscribe((data:ClientesInterface[]) =>{
      this.clientes = data;
    },
    (errorData) => (alert("Usuario no Autorizado"),
//    this.router.navigate(['/']),
    console.log(errorData)))
  }

  eliminar(data: ClientesInterface) {
    this.confirmationService.confirm({
        message: '¿Esta seguro que desea eliminar el Cliente: '+data.nombres+' '+data.apellidos+'?',
        header: 'Advertencia',
        icon: 'pi pi-ban',
        accept: () => {
          data.transaccion="BORRAR_CLIENTES";
          this.service.delData(data).subscribe((data:ResponseBackInterface) =>{
            this.mostrarTodos()
            this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
          })
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Notificacion', detail: 'Verifica si es el cliente correcto'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Problema', detail: 'No se elimino el cliente' });
                    break;
            }
        }
    });
  }

  modificar(data: ClientesInterface){
    this.dialog.open(ModificarClientesComponent,{
      width: '70%',
      maxHeight: '80vh',
      data: {parametro: data}
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
 
}
