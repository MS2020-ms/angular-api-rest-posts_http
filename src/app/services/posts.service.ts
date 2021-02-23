import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //inyectar HttpClient
  constructor(private httpClient: HttpClient) { }
}
