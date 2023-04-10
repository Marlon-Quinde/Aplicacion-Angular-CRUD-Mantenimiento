import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInicioComponent } from './pages/home-inicio/home-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: HomeInicioComponent
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
export class PagePrincipalRoutingModule { }
