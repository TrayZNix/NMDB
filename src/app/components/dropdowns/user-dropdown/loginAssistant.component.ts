import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-assistant",
  template: "<h1>Login in...</h1>",
})
export class LoginAssistantComponent implements OnInit {
  constructor(
    private adRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.adRoute.queryParams.subscribe((qParams) => {
      if (qParams["approved"] == "true") {
        this.authService
          .createSession(qParams["request_token"])
          .subscribe((sessionToken) => {
            if (sessionToken.success) {
              localStorage.setItem("sessionId", sessionToken.session_id);
              Swal.fire({
                title: "¡Genial!",
                text: "Has inciado sesión correctamente",
                icon: "success",
              }).then((result) => {
                this.router.navigate(["peliculas"]);
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "No se ha podido crear el session ID",
                confirmButtonText: "Volver a inicio",
                icon: "error",
              }).then((result) => {
                this.router.navigate(["peliculas"]);
              });
            }
          });
      } else {
        Swal.fire({
          title: "No te has conseguido loguear",
          confirmButtonText: "Volver a inicio",
          icon: "error",
        }).then((result) => {
          this.router.navigate(["peliculas"]);
        });
      }
    });
  }
}
