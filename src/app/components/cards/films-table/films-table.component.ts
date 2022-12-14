import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { pelisFav } from "src/app/interfaces/favorites.interface";
import { Films } from "src/app/interfaces/popularFilm.interface";
import { FavoriteFilmsService } from "src/app/Services/favorite-films.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-films-table",
  templateUrl: "./films-table.component.html",
  styleUrls: ["./films-table.component.css"],
})
export class FilmsTableComponent implements OnInit {
  @Input() movies?: Films[];

  movie: Films[] = [];
  filmImgUrl: string = "https://image.tmdb.org/t/p/w500/";

  percentage: number = 0;

  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(
    private router: Router,
    private favoriteFilmsService: FavoriteFilmsService
  ) {}
  misFavoritas!: pelisFav[];
  loaded: boolean = false;

  ngOnInit(): void {
    this.setPeliculasFavoritas();
  }
  setPeliculasFavoritas() {
    this.favoriteFilmsService.getFavoriteFilms().subscribe((result) => {
      this.misFavoritas = result.results;
      this.loaded = true;
    });
  }
  getVotesAverage(movie: Films) {
    return (this.percentage = Number((movie.vote_average * 10).toFixed(2)));
  }

  onFilmClick(id: string) {
    this.router.navigate(["/peliculas", id]);
  }

  getImgUrl(backdrop: string) {
    return `${this.filmImgUrl}${backdrop}`;
  }

  imgOnError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src =
      "../../../assets/img/notfoundfilm404.jpg";
  }

  onMovieClick(movie: Films) {
    this.router.navigate(["/peliculas", movie.id]);
  }

  onActivate(event: Event) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  checkIfFav(movieId: number) {
    let appears: boolean = false;
    this.misFavoritas.forEach((movie) => {
      if (movie.id == movieId) {
        appears = true;
      }
    });
    return appears;
  }
  setFavorite(movieId: number, value: boolean) {
    this.favoriteFilmsService.setFavorite(movieId, value).subscribe(
      (response) => {
        if (
          (response.success && response.status_code == 1) ||
          response.status_code == 12
        ) {
          Swal.fire({
            title: "??Hecho!",
            text: "Se ha a??adido a favoritos correctamente",
            icon: "success",
          }).then(() => {
            this.setPeliculasFavoritas();
          });
        } else if (response.success && response.status_code == 13) {
          Swal.fire({
            title: "??Hecho!",
            text: "Se ha eliminado de favoritos correctamente",
            icon: "success",
          }).then(() => {
            this.setPeliculasFavoritas();
          });
        } else if (!response.success) {
          Swal.fire({
            title: "Error :C",
            text: "Ha ocurrido un error, no se ha podido a??adir a favoritos",
            icon: "error",
          });
          this.setPeliculasFavoritas();
        }
      },
      (Error) => {
        Swal.fire({
          title: "Error :C",
          text: "Ha ocurrido un error, no se ha podido a??adir a favoritos",
          icon: "error",
        });
      }
    );
  }
}
