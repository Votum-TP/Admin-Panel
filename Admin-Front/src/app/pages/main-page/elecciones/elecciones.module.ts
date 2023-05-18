import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { EleccionesComponent } from './elecciones.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EleccionesRoutingModule } from './elecciones-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    EleccionesRoutingModule,
    HttpClientModule
  ],
  declarations: [EleccionesComponent]
=======

import { EleccionesRoutingModule } from './elecciones-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EleccionesRoutingModule
  ]
>>>>>>> be75b004aedbd172099b953a5fcbefd3ca1c1048
})
export class EleccionesModule { }
