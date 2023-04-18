import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoRoutingModule } from './proceso-routing.module';
import { ProcesoComponent } from './proceso.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropComponent } from 'src/app/shared/dragdrop/dragdrop.component';
import { EleccionService } from 'src/app/services/eleccion/eleccion.service';


@NgModule({
  declarations: [
    ProcesoComponent,
    DragDropComponent,

  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    DragDropModule,
    
  ]
})
export class ProcesoModule { }
