import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Films } from "src/app/interfaces/popularFilm.interface";
import { AuthService } from "src/app/Services/auth.service";
import { PopularFilmsService } from "src/app/Services/popular-films.service";

@Component({
  selector: "app-peliculas",
  templateUrl: "./peliculas.component.html",
  styleUrls: ["./peliculas.component.css"]
})
export class PeliculasComponent implements OnInit {

  movies:Films[] = [];
  moviesSlideShow:Films[] = [];

  constructor(private authService: AuthService, private filmsService: PopularFilmsService) {}

  ngOnInit() {
    this.filmsService.getPeliculas().subscribe(resp => {
      this.moviesSlideShow = resp;
      this.movies = resp;
    });

  }

  login() {
    let requestToken: string;
    this.authService.createRequestToken().subscribe((token) => {
      if (token.success) {
        requestToken = token.request_token;
        console.log(requestToken);
        this.authService.createSession(requestToken);
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:4200/auth/login`; //!Cambiar ip por nombre de pagina web
      } else {
        console.log("Error al pedir o recoger el token de logueo");
      }
    });
  }
}
