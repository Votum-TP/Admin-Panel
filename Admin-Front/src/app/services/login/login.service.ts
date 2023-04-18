import { Injectable } from '@angular/core';
import {HttpClient} from 'node_modules/@angular/common/http/'
import axios, { AxiosResponse } from 'axios';
import {Observable} from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private API = "https://localhost:7101/api/";
  // private API = "http://egopro1-001-site1.btempurl.com/api/";
constructor(private router : Router) { }

public IniciarSesion(codigoUsuario: string, contrasena: string){
  var data ={
    "codigoUsuario":codigoUsuario,
    "contrasena": contrasena
  }
  var self = this.router;
  console.log( JSON.stringify(data));
  var response =  axios({
    url: this.API + "Login/LoginPanel",
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data)
  }).then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      console.log(response);
      self.navigateByUrl("/Votum/elecciones");

    }else{
      console.log(response);
      $(".popup-title").html("Error de inicio de sesión");
      $(".popup").addClass("active");
      $(".form").addClass("blur");
      $(".popup-description").html(response.data.mensaje);
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });
}
}