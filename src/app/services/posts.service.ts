import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl: string;

  //inyectar HttpClient
  //Url: https://jsonplaceholder.typicode.com/guide/ -> Listing all resources
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  }

  //GET
  //any[]: Regresa Muchos Objetos
  getAll(): Promise<any[]> {
    //metodo .get me devuelve un Observable -> MG transformar en Promesa con metodo .toPromise, ahora me devuelve una Promesa. La retorno para que se consuma fuera donde vaya a recuperar informacion. Devuelve un array de objetos [{},{},{}...]
    return this.httpClient.get<any[]>(this.baseUrl).toPromise();
  }

  //any: Regresa Un Unico Objeto
  getById(pId: number): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${pId}`).toPromise();
  }

  //POST
  //any: Regresa Un Unico Objeto
  create({ title, body, userId }): Promise<any> {

    const bodyRequest = { title, body, userId };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8'
      })
    }
    //.post(url, body, headers)
    return this.httpClient.post<any>(this.baseUrl, bodyRequest, httpOptions).toPromise();
  }

  //PUT
  update({ id, title, body, userId }): Promise<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, { id, title, body, userId }).toPromise();
  }

  //DELETE
  delete(pId: number): Promise<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${pId}`).toPromise();
  }
}
