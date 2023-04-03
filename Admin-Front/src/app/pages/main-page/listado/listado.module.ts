import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListadoComponent,
    ResultadoComponent
  ],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    HttpClientModule
  ]
})
export class ListadoModule { }
