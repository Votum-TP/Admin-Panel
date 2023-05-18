import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AdminsService } from 'src/app/services/administradores/administradores.service';
import {EleccionResponse} from 'src/app/classes/EleccionResponse'
import { Router } from '@angular/router';
import {MatSortModule} from '@angular/material/sort';
import { id } from '@swimlane/ngx-charts';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit{
  data1: any;
  serviceAdmin :any
  routerAdmin:any
  constructor(private service : AdminsService,private router: Router) {
      this.serviceAdmin = service
      this.routerAdmin = router
  }
    
   
    ngOnInit(): void {
      this.service.GetAdministradores().subscribe( admins =>{
        // console.log(elecciones);
        if(admins.length>=5){
          let tableContainer = document.getElementById("id-admins-table-container")??new HTMLElement;
          tableContainer.setAttribute("style","height: 600px; overflow: scroll; box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12);");
        }
        let tableBody = document.getElementById("table-body")??new HTMLElement;
      
        let i = 0;
        admins.forEach(element => {
          let tr= document.createElement("tr");
          tr.setAttribute("css"," width: 100%;background-color: #fafafa;font-family: Poppins;");
          tr.setAttribute("class","tr-element");

          tr.innerHTML=`<td style="padding: 2px 20px;text-align: center; background-color: #fafafa;">${++i}</td><td style="padding: 23px 20px;text-align: center;background-color: #e9f1f5;">${element.Codigo}</td><td style="padding: 23px 20px;text-align: center;background-color: #fafafa;">${element.FechaHoraRegistro}</td><td style="padding: 23px 20px;text-align: center;background-color: #e9f1f5;">  <div class="action-buttons"><button  type="button" (click)=eliminar($event)  id="eliminar${element.IdAdministrador}-id" class="button-eliminar" style=";line-height: 35px;font-weight: 600;font-size: .8em;border:none;font-family: Poppins;; background-color: #F45B69;cursor: pointer; border-radius: 8px;color: white;font-weight: 600;text-align: center;margin: 20px 11px;;width: 85px;box-shadow: 0px 5px 5px -3px;rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12);">Eliminar</button><input type="hidden"  class="idColumn"  value=${element.IdAdministrador}/></div></td>`;
          tableBody.appendChild(tr);
          tableBody.appendChild(document.createElement("hr"));
          let lnk = document.getElementById('eliminar'+element.IdAdministrador+'-id');
          lnk.addEventListener('mouseover', this.cambiarColor);
          lnk.addEventListener('mouseout', this.cambiarColor);
          let serviceAdmin = this.service;
          let routerAdmin = this.router;
          let ngOnInitbase = this
          lnk.addEventListener('click', function(e:any){
            ngOnInitbase.eliminar(e,serviceAdmin,routerAdmin);
        }, false);

        });
      })
    }
    
    eliminar(e : any,serviceAdmin : any,routerAdmin : any){
     var idElement = e.currentTarget.id
     var idEleccion = idElement.substring(8, idElement.indexOf('-'));
     console.log(idEleccion);
     console.log("this.serviceAdmin");

     console.log(this.serviceAdmin);
      this.serviceAdmin.EliminarAdministrador(idEleccion);
      this.routerAdmin.navigate(['/Votum/administradores']);

    }
    cambiarColor(e:any)
    {
    if(e.type=="mouseover")
       e.currentTarget.style.background = '#f47c87';
    else
       e.currentTarget.style.background = '#F45B69';
    }
   

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

