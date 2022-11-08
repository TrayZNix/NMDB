import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cast } from "src/app/interfaces/credits-film.interface";
import {
  FilmDetailResponse,
  Genre,
} from "src/app/interfaces/filmdetail.interface";
import { VideoReponse, Videos } from "src/app/interfaces/movie-video.interface";
import { AuthService } from "src/app/Services/auth.service";
import { PopularFilmsService } from "src/app/Services/popular-films.service";
import { DomSanitizer } from "@angular/platform-browser";
import { FormControl, FormGroup } from "@angular/forms";
import { RatingsService } from "src/app/Services/ratings.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-pelicula-details",
  templateUrl: "./pelicula-details.component.html",
  styleUrls: ["./pelicula-details.component.css"],
})
export class PeliculaDetailsComponent implements OnInit {
  filmImgUrl: string = "https://image.tmdb.org/t/p/w500/";
  film?: FilmDetailResponse;
  cast: Cast[] = [];
  video: Videos[];
  formulario!: FormGroup;

  constructor(
    private authService: AuthService,
    private sanitazer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filmsService: PopularFilmsService,
    private ratingService: RatingsService
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    this.filmsService.getFilmDetails(id).subscribe((movie) => {
      if (!movie) {
        this.router.navigateByUrl("/peliculas");
        return;
      }
      this.film = movie;
    });

    this.filmsService.getCast(id).subscribe((cast) => {
      this.cast = cast;
    });

    this.filmsService.getVideo(id).subscribe((video) => {
      this.video = video;
    });

    //InicializarFormulario
    this.formulario = new FormGroup({ valoracion: new FormControl(0.5) });
    //
  }

  login() {
    let requestToken: string;
    this.authService.createRequestToken().subscribe((token) => {
      if (token.success) {
        requestToken = token.request_token;
        this.authService.createSession(requestToken);
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://nmdbii.web.app/auth/login`; //!Cambiar ip por nombre de pagina web
      } else {
        console.log("Error al pedir o recoger el token de logueo");
      }
    });
  }

  getImgUrl(backdrop: string) {
    return `${this.filmImgUrl}${backdrop}`;
  }

  imgOnError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src =
      "../../../assets/img/notfoundfilm404.jpg";
  }

  getUrlVideo(video: Videos) {
    let url = `https://www.youtube.com/embed/${video.key}`;

    return this.sanitazer.bypassSecurityTrustResourceUrl(url);
  }

  valorarPelicula() {
    this.ratingService
      .rateMovie(this.film.id, this.formulario.controls["valoracion"].value)
      .subscribe(
        (response) => {
          if (response.success) {
            Swal.fire({
              title: "¡Hecho!",
              text:
                "Has valorado esta pelicula con " +
                this.formulario.controls["valoracion"].value +
                " estrellas",
              icon: "success",
            });
          } else if (!response.success) {
            Swal.fire({
              title: "Error :C",
              text: "Ha ocurrido un error, no hemos podido añadir tu valoración",
              icon: "error",
            });
          }
        },
        (Error) => {
          Swal.fire({
            title: "Error :C",
            text: "Ha ocurrido un error, no hemos podido añadir tu valoración",
            icon: "error",
          });
        }
      );
  }
}
