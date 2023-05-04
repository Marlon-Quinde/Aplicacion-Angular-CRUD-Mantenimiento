//Modulos Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';

//Material Desing
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';

//Componentes
import { MostrarClientesComponent } from './pages/mostrar-clientes/mostrar-clientes.component';
import { RegistrarClientesComponent } from './pages/registrar-clientes/registrar-clientes.component';
import { ModificarClientesComponent } from './pages/modificar-clientes/modificar-clientes.component';
import { HomeClientesComponent } from './pages/home-clientes/home-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MostrarClientesComponent,
    RegistrarClientesComponent,
    ModificarClientesComponent,
    HomeClientesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    //Modules
    SharedModule,
    
    //Material y PrimeNg
    PrimeNgModule,
    AngularMaterialModule,

    //Router
    ClientesRoutingModule
  ],
  providers:[
    ConfirmationService, 
    MessageService, 
  ]
})
export class ClientesModule { }
