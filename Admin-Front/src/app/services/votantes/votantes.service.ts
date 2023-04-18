import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VotantesService {

  private API = "https://localhost:7101/api/";
  // private API = "http://egopro1-001-site1.btempurl.com/api/";


constructor() { }

public postVotante(formData: any){
  var response =  axios({
    // url: "http://egopro1-001-site1.btempurl.com/api/Votantes/CargarParticipantes",
    url: this.API+"Votantes/CargarParticipantes",
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
    console.log(error);
  });
}
}
