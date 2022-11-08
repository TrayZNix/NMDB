import { Component, Input, OnInit } from "@angular/core";
import { pelisFav } from "src/app/interfaces/favorites.interface";
import { FavoriteFilmsService } from "src/app/Services/favorite-films.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.scss"],
})
export class FavoritesComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  peliculasFavoritas!: pelisFav[];
  constructor(private favoriteFilmsService: FavoriteFilmsService) {}

  ngOnInit(): void {
    // this.actualizarPeliculas;
  }

  // actualizarPeliculas() {
  //   this.favoriteFilmsService.getFavoriteFilms().subscribe((result) => {
  //     this.peliculasFavoritas = result.results;
  //     console.log(this.peliculasFavoritas);
  //   });
  // }
}
