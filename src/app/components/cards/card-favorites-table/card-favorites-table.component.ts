import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FavoriteFilmsService } from "src/app/Services/favorite-films.service";
import Swal from "sweetalert2";
import { pelisFav } from "../../../interfaces/favorites.interface";

@Component({
  selector: "app-card-favorites-table",
  templateUrl: "./card-favorites-table.component.html",
  styleUrls: ["./card-favorites-table.component.css"],
})
export class CardFavoritesTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  peliculas: pelisFav[];
  constructor(
    private favoriteFilmService: FavoriteFilmsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavoriteFilms();
  }
  loadFavoriteFilms() {
    this.favoriteFilmService.getFavoriteFilms().subscribe((result) => {
      this.peliculas = result.results;
    });
  }
  onMovieClick(movieId: number) {
    this.router.navigate(["/peliculas", movieId]);
    //Hecho con navigate ya que no nos ha sido posible usar el router link en la tabla
  }
  removeFromFavorite(movieId: number) {
    this.favoriteFilmService.setFavorite(movieId, false).subscribe(
      (response) => {
        if (
          (response.success && response.status_code == 1) ||
          response.status_code == 12
        ) {
          Swal.fire({
            title: "¡Hecho!",
            text: "Se ha añadido a favoritos correctamente",
            icon: "success",
          }).then(() => {
            this.loadFavoriteFilms();
          });
        } else if (response.success && response.status_code == 13) {
          Swal.fire({
            title: "¡Hecho!",
            text: "Se ha eliminado de favoritos correctamente",
            icon: "success",
          }).then(() => {
            this.loadFavoriteFilms();
          });
        } else if (!response.success) {
          Swal.fire({
            title: "Error :C",
            text: "Ha ocurrido un error, no se ha podido añadir a favoritos",
            icon: "error",
          });
        }
      },
      (Error) => {
        Swal.fire({
          title: "Error :C",
          text: "Ha ocurrido un error, no se ha podido añadir a favoritos",
          icon: "error",
        });
        this.loadFavoriteFilms();
      }
    );
  }
}
