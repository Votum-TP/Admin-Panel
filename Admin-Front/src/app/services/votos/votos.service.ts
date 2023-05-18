import { Injectable } from '@angular/core';
import axios from 'axios';
import {HttpClient} from 'node_modules/@angular/common/http/'
import {Observable} from 'rxjs'
import { VotoResponse } from 'src/app/classes/VotoResponse';
@Injectable({
  providedIn: 'root'
})
export class VotosService {

 private API = "https://localhost:7101/api/";
  // private API = "http://egopro1-001-site1.btempurl.com/api/";
  //  private API = "http://votumproject-001-site1.etempurl.com/api/";

  constructor(private http : HttpClient) { }

public  GetVoto(codigo: string) : Observable<VotoResponse>{
  console.log(localStorage.getItem("token"));
  var response= this.http.get<VotoResponse>(this.API + 'Votos/AuditarVoto/'+codigo, {
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem("token")
    }
  });

  // if(response.data.code == 200){
  //   $(".popup-title").html("¡Guardado exitoso!");

  // }else{
  //   $(".popup-title").html("Error en el guardado");
  // }
  // $(".popup").addClass("active");
  // $(".form").addClass("blur");
  // $(".popup-description").html(response.data.mensaje);

  return response;
}
}
