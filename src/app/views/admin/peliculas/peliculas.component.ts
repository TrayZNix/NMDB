import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-peliculas",
  templateUrl: "./peliculas.component.html",
})
export class PeliculasComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

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
