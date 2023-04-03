import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  url: string = 'https://localhost:7101/api/'
  constructor(private http: HttpClient) {
 
  }

  getAllElections(){
    return this.http.get(`${this.url}`);
  }
  
}
