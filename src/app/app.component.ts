import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //del tipo any[] lo mismo que me va a devolver la peticion -> ver  metodo getAll en service
  arrPosts: any[];

  formulario: FormGroup;

  //inyecto PostsService
  constructor(private postsService: PostsService) {

    this.arrPosts = [];

    this.formulario = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
      userId: new FormControl('')
    });
  }

  //GET
  ngOnInit() {
    //Esta llamada al metodo getAll me devuelve una Promesa
    this.postsService.getAll()
      .then(posts => this.arrPosts = posts)
      .catch(error => console.log(error));
  }

  //GET
  async onClick(pId: number) {
    try {
      const post = await this.postsService.getById(pId);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  }

  //POST
  onClickPost() {
    this.postsService.create({
      title: 'Nuevo Titulo',
      body: 'Este es el cuerpo del Post',
      userId: 1
    }).then(response => console.log(response))
      .catch(error => console.log(error));
  }

  //POST por formulario:
  async onSubmit() {
    try {
      const response = await this.postsService.create(this.formulario.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  //PUT
  onClickUpdate() {
    this.postsService.update({
      id: 5,
      title: 'Nuevo Titulo',
      body: 'Este es el nuevo cuerpo del Post',
      userId: 3
    }).then(response => console.log(response))
      .catch(error => console.log(error));
  }

  //DELETE
  async onClickDelete() {
    try {
      const response = await this.postsService.delete(5);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
