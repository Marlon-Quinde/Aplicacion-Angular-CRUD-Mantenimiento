import { Component } from '@angular/core';
import { PerfilesService } from '../../services/perfiles.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { PerfilesInterfaces } from '../../interfaces/Perfiles.interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { ResponseBackInterface } from 'src/app/shared/interfaces/ResponseBack.interfaces';
import { ModificarPerfilesComponent } from '../modificar-perfiles/modificar-perfiles.component';
import { AgregarPerfilesComponent } from '../agregar-perfiles/agregar-perfiles.component';

@Component({
  selector: 'app-mostrar-perfiles',
  templateUrl: './mostrar-perfiles.component.html',
  styleUrls: ['./mostrar-perfiles.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class MostrarPerfilesComponent {
  constructor(private service:PerfilesService, 
    private confirmationService:ConfirmationService, 
    private messageService: MessageService, 
    private dialog:MatDialog){}
    perfiles: PerfilesInterfaces[] = []
    registros = new FormGroup({
    transaccion: new FormControl() 

})

  ngOnInit() {
    this.mostrarTodos();
  };

  mostrarTodos(){
      this.registros.value.transaccion = 'MOSTRAR_PERFILES';
      this.service.getData(this.registros.value as PerfilesInterfaces).subscribe((data:PerfilesInterfaces[]) =>{
      this.perfiles = data;
    });
  };

  eliminar(data: PerfilesInterfaces) {
    this.confirmationService.confirm({
    message: '¿Esta seguro que desea eliminar el perfil: '+data.descripcion+'?',
    header: 'Advertencia',
    icon: 'pi pi-ban',
    accept: () => {
    data.transaccion="BORRAR_PERFILES";
    this.service.delData(data).subscribe((data:ResponseBackInterface) =>{
      this.mostrarTodos()
      this.messageService.add({severity: 'info', summary: data.respuesta, detail: data.leyenda });
    })
  },
  reject: (type:any) => {
    switch (type) {
        case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'info', summary: 'Notificacion', detail: 'Verifica si desea borrar el perfil'});
            break;
        case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'error', summary: 'Problema', detail: 'No se elimino el perfil' });
            break;
    }
  }
  });
  }

  modificar(data: PerfilesInterfaces ){
    this.dialog.open(ModificarPerfilesComponent,{
      width: '70%',
      maxHeight: '80vh',
      data: {parametro: data}
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
  agregar(){
    this.dialog.open(AgregarPerfilesComponent,{
      width: '70%',
      maxHeight: '80vh'
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
}
