import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostrarClientesComponent } from './pages/mostrar-clientes/mostrar-clientes.component';
import { RegistrarClientesComponent } from './pages/registrar-clientes/registrar-clientes.component';
import { ModificarClientesComponent } from './pages/modificar-clientes/modificar-clientes.component';
import { HomeClientesComponent } from './pages/home-clientes/home-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeClientesComponent,
    children:[
      {
        path: 'mostrar-clientes',
        component: MostrarClientesComponent
      },
      {
        path: 'agregar-clientes',
        component: RegistrarClientesComponent
      },
      {
        path: 'modificar-clientes',
        component: ModificarClientesComponent
      },
      {
        path: '**',
        redirectTo: 'mostrar-clientes'
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class ClientesRoutingModule { }
