import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DatatableComponent } from './components/datatable/datatable.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DatatableComponent,
  ],
  imports:[
    CommonModule,
    PrimeNgModule,

    FormsModule 
  ],
  exports:[
    DatatableComponent,
  ]
})
export class SharedModule { }
