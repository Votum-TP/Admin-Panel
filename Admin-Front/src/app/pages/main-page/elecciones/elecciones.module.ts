import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
})
export class EleccionesModule { }
