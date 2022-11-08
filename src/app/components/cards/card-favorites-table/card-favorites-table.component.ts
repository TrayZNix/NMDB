import { Component, OnInit, Input } from "@angular/core";
import { FavoriteFilmsService } from "src/app/Services/favorite-films.service";
import { pelisFav } from "../../../interfaces/favorites.interface";

@Component({
  selector: "app-card-favorites-table",
  templateUrl: "./card-favorites-table.component.html",
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
  constructor(private favoriteFilmService: FavoriteFilmsService) {}

  ngOnInit(): void {
    // peliculas
    this.favoriteFilmService.getFavoriteFilms().subscribe((result) => {
      this.peliculas = result.results;
    });
  }
}
