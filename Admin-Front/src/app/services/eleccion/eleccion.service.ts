import { Injectable } from '@angular/core';
import {HttpClient} from 'node_modules/@angular/common/http/'
import axios, { AxiosResponse } from 'axios';
import {EleccionResponse} from 'src/app/classes/EleccionResponse'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EleccionService {

  private API = "https://localhost:7101/api/";
  // private API = "http://egopro1-001-site1.btempurl.com/api/";
constructor(private http : HttpClient) { }

public postEleccion(formData: any){
  var response =  axios({
    url: this.API + "Elecciones/CrearEleccion",
    method: "POST",
    headers:{
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb2RpZ29Vc3VhcmlvIjoic3RyaW5nIiwianRpIjoiZDI4YWRkNGMtZmRhMS00MmMxLThjOWMtMWRhYzgyMzc2OGM5IiwiRGF0ZUdlbmVyYXRlZCI6IjE3LzA0LzIwMjMgMTM6NTk6MjYiLCJleHAiOjE2ODQzMzE5NjZ9.kkWyLIA4LMaxm6mcIUqnrXfwFfEE47AnUUOKLfl79hs'

    },
    data: formData
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
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

public  GetElecciones() : Observable<EleccionResponse[]>{
  return this.http.get<EleccionResponse[]>(this.API + 'Elecciones/ListarElecciones', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb2RpZ29Vc3VhcmlvIjoic3RyaW5nIiwianRpIjoiZDI4YWRkNGMtZmRhMS00MmMxLThjOWMtMWRhYzgyMzc2OGM5IiwiRGF0ZUdlbmVyYXRlZCI6IjE3LzA0LzIwMjMgMTM6NTk6MjYiLCJleHAiOjE2ODQzMzE5NjZ9.kkWyLIA4LMaxm6mcIUqnrXfwFfEE47AnUUOKLfl79hs'
    }
  });
}
}
