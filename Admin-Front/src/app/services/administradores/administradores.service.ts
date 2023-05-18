import { Injectable } from '@angular/core';
import {HttpClient} from 'node_modules/@angular/common/http/'
import axios, { AxiosResponse } from 'axios';
import {AdminResponse} from 'src/app/classes/AdminResponse'
import {PartidoGraphicResponse,EleccionGraphicResponse} from 'src/app/classes/PartidoGraphicResponse'
import { Router } from '@angular/router';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

 // private API = "https://localhost:7101/api/";
   // private API = "http://egopro1-001-site1.btempurl.com/api/";
   private API = "http://votumproject-001-site1.etempurl.com/api/";

constructor(private http : HttpClient,private router : Router) { }


public crearAdministrador(codigo: any){
  var data ={
    "Codigo":codigo,
  }
  var self = this.router;
  var response =  axios({
    url: this.API + "Administradores/CrearAdministrador",
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token")
    },
    data: JSON.stringify(data)
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      $(".popup-title").html("¡Creación de administrador exitosa!");

    }else{
      $(".popup-title").html("Error en el cambio de estado");
    }
    $(".popup").addClass("active");
    $(".form").addClass("blur");
    $(".popup-description").html("Se envió un correo a todos los administradores como constancia de la creación del nuevo administrador");
  
  })
  .catch(function (error) {
  });
}

public EliminarAdministrador(IdAdministrador: any){
  var data ={
    "IdAdministrador":IdAdministrador,
  }
  var self = this.router;
  var response =  axios({
    url: this.API + "Administradores/EliminarAdministrador",
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token")
    },
    data: JSON.stringify(data)
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      $(".popup-title").html("Eliminación de administrador exitosa!");
      this.self.navigate(['/Votum/administradores']);
    }else{
      $(".popup-title").html("Error en el cambio de estado");
    }
    $(".popup").addClass("active");
    $(".form").addClass("blur");
    $(".popup-description").html("Se envió un correo a todos los administradores como constancia de la eliminación del nuevo administrador");
  })
  .catch(function (error) {
  });
}
public GetAdministradores() : Observable<AdminResponse[]>{
  return this.http.get<AdminResponse[]>(this.API + 'Administradores', {
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem("token")
    }
  });
}

// public GetEleccion (idEleccion: any): any {
//   var response =  axios({
//     // url: "http://egopro1-001-site1.btempurl.com/api/Votantes/CargarParticipantes",
//     url: 'https://localhost:7101/api/' + 'Elecciones/DetalleEleccion/'+idEleccion,
//     method: "GET",
//     headers:{
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb2RpZ29Vc3VhcmlvIjoic3RyaW5nIiwianRpIjoiZTA5ODg3MWEtYTM5ZS00ZWM2LWE5OGUtODcyZDQ2OWE1ODMxIiwiRGF0ZUdlbmVyYXRlZCI6IjE5LzA0LzIwMjMgMTU6NDE6MjQiLCJleHAiOjE2ODQ1MTA4ODR9.Zb9DGlepyY9rTnsrWEsrd5Fiuv4cC75LF2H_UhYFowQ'
//     },
    
//   }).then(function (response) {
//     return response.data.Partidos;
    
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }
}
