import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: LoginComponent
      },
      { 
        path: '**',
        redirectTo: 'error'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild (routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
