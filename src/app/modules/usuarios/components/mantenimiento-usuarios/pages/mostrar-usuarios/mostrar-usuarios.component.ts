import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioInterface } from '../../../../../auth/interfaces/Usuario.interfaces';
import { UsuariosService } from '../../services/usuarios.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ResponseBackInterface } from '../../../../../../shared/interfaces/ResponseBack.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ModificarUsuariosComponent } from '../modificar-usuarios/modificar-usuarios.component';
import { AgregarUsuariosComponent } from '../agregar-usuarios/agregar-usuarios.component';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class MostrarUsuariosComponent implements OnInit {

  constructor(private service:UsuariosService, 
              private confirmationService:ConfirmationService, 
              private messageService: MessageService, 
              private dialog:MatDialog){}
  usuarios: UsuarioInterface[] = []
  nameColumns: any;

  termino: string = ''
  registros = new FormGroup({
    transaccion: new FormControl() 

  })
  
  ngOnInit() {
    this.mostrarTodos();
  };

  mostrarTodos(){
    this.registros.value.transaccion = 'MOSTRAR_USUARIOS';
    this.service.getData(this.registros.value as UsuarioInterface).subscribe((data:UsuarioInterface[]) =>{
      this.usuarios = data;
      this.nameColumns = Object.keys(data[0])
    });
  };

  eliminar(data: UsuarioInterface) {
    this.confirmationService.confirm({
        message: '¿Esta seguro que desea eliminar el Usuario: '+data.nombres+' '+data.apellidos+'?',
        header: 'Advertencia',
        icon: 'pi pi-ban',
        accept: () => {
          data.transaccion="BORRAR_USUARIOS";
          this.service.delData(data).subscribe((data:ResponseBackInterface) =>{
            this.mostrarTodos()
            this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
          })
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Notificacion', detail: 'Verifica si es el usuario correcto'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Problema', detail: 'No se elimino el usuario' });
                    break;
            }
        }
    });
  }

  modificar(data: UsuarioInterface ){
    console.log(this.termino)
    this.dialog.open(ModificarUsuariosComponent,{
      width: '70%',
      maxHeight: '80vh',
      data: {parametro: data}
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
  agregar(){
    this.dialog.open(AgregarUsuariosComponent,{
      width: '70%',
      maxHeight: '80vh'
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }

}
