import { Component, OnInit } from '@angular/core';
import { ListadoService } from './services/listado.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(
    private listadoService: ListadoService 
  ) { }

  Elecciones = <any>[]
  ngOnInit(): void {
  }
  initialize() {
    this.listadoService.getAllElections().subscribe((response: any) => {
     this.Elecciones = response;
    })
  }
  
}
