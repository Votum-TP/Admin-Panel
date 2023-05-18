import { Injectable } from '@angular/core';
import {HttpClient} from 'node_modules/@angular/common/http/'
import axios, { AxiosResponse } from 'axios';
import {EleccionResponse} from 'src/app/classes/EleccionResponse'
import {PartidoGraphicResponse,EleccionGraphicResponse} from 'src/app/classes/PartidoGraphicResponse'
import { Router } from '@angular/router';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EleccionService {

 private API = "https://localhost:7101/api/";
   // private API = "http://egopro1-001-site1.btempurl.com/api/";
  //  private API = "http://votumproject-001-site1.etempurl.com/api/";

constructor(private http : HttpClient,private router : Router) { }

public postEleccion(formData: any){
  var self = this.router;
  var response =  axios({
    url: this.API + "Elecciones/CrearEleccion",
    method: "POST",
    headers:{
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer '+localStorage.getItem("token")

    },
    data: formData
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      $(".button-action-pop").val(1);
      $(".popup-title").html("¡Guardado exitoso!");
    }else{
      $(".popup-title").html("Error en el guardado");
    }
    $(".popup").addClass("active");
    $(".form").addClass("blur");
    $(".popup-description").html(response.data.mensaje);
  
  })
  .catch(function (error) {
  });
}
public iniciarEleccion(idEleccion: any){
  var data ={
    "IdEleccion":idEleccion,
  }
  var self = this.router;
  var response =  axios({
    url: this.API + "Elecciones/CambioEstadoEleccionIniciado",
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token")
    },
    data: JSON.stringify(data)
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      $(".popup-title").html("¡Inicialización exitosa!");

    }else{
      $(".popup-title").html("Error en el cambio de estado");
    }
    $(".popup").addClass("active");
    $(".form").addClass("blur");
    $(".popup-description").html(response.data.mensaje);
  
  })
  .catch(function (error) {
  });
}

public finalizarEleccion(idEleccion: any){
  var data ={
    "IdEleccion":idEleccion,
  }
  var self = this.router;
  var response =  axios({
    url: this.API + "Elecciones/CambioEstadoEleccionTerminado",
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token")
    },
    data: JSON.stringify(data)
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      $(".popup-title").html("¡Finalización exitosa!");

    }else{
      $(".popup-title").html("Error en el cambio de estado");
    }
    $(".popup").addClass("active");
    $(".form").addClass("blur");
    $(".popup-description").html(response.data.mensaje);
  })
  .catch(function (error) {
  });
}
public  GetElecciones() : Observable<EleccionResponse[]>{
  return this.http.get<EleccionResponse[]>(this.API + 'Elecciones/ListarElecciones', {
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem("token")
    }
  });
}
public  GetEleccion(idEleccion: any) : Observable<EleccionGraphicResponse>{
  var response= this.http.get<EleccionGraphicResponse>(this.API + 'Elecciones/DetalleEleccion/'+idEleccion, {
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem("token")
    }
  });
  return response;
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
