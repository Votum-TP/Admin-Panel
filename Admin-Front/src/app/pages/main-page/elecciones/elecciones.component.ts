import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EleccionService } from 'src/app/services/eleccion/eleccion.service';
import {EleccionResponse} from 'src/app/classes/EleccionResponse'
import { Router } from '@angular/router';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-elecciones',
  templateUrl: './elecciones.component.html',
  styleUrls: ['./elecciones.component.css']
})
export class EleccionesComponent implements OnInit{
  data: any;
  constructor(private service : EleccionService,private router: Router) {
    
      
  }
    displayedColumns: string[] = ['Id','Nombre', 'Estado', 'FechaInicio', 'Ganador','actions'];
    // $(".estado-eleccion").each(function (i, item) {
    //   console.log($(item).val());
    //   if($(item).val() == "no iniciado"){
    //   }else
    //   if($(item).val() == "iniciado"){
    //     console.log($(item).parent());
    //     var parent = $(item).parent();
    //     var buttonAction= parent.find(".button-action-eleccion");
    //     buttonAction.html("Terminado");
    //     buttonAction.removeClass("button-iniciar");
    //     buttonAction.addClass("button-finalizar");

    //   }else
    //   if($(item).val() == "terminado"){
    //     console.log($(item).parent());
    //     var parent = $(item).parent();
    //     var buttonAction= parent.find(".button-action-eleccion");
    //     buttonAction.remove();
    //   }
    // })
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit(): void {
      this.service.GetElecciones().subscribe( elecciones =>{
        // console.log(elecciones);
        this.data = new MatTableDataSource<any>(elecciones);
        this.data.paginator = this.paginator;
        
      })
    }
    
    revisar(element : any){
     var idElement = element.srcElement.id;
     var idEleccion = idElement.substring(7, idElement.indexOf('-'));
     console.log(idEleccion);
     this.router.navigate(['/Votum/elecciones/detalle/'+idEleccion]);
    }


}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

