import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminsRoutingModule } from './admins-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AdminsRoutingModule,
    HttpClientModule
  ],
  declarations: [AdminsComponent]
})
export class AdminsModule { }
