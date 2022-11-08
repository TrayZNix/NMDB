import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Films } from "src/app/interfaces/popularFilm.interface";
import { AuthService } from "src/app/Services/auth.service";
import { RatingsService } from "src/app/Services/ratings.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-review-film-table",
  templateUrl: "./review-film-table.component.html",
  styleUrls: ["./review-film-table.component.css"],
})
export class ReviewFilmsTableComponent implements OnInit {
  @Input() movies?: Films[];

  movie: Films[] = [];
  filmImgUrl: string = "https://image.tmdb.org/t/p/w500/";

  percentage: number = 0;

  @Input() accountId!: number;

  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private router: Router, private ratingService: RatingsService) {}

  ngOnInit(): void {}

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
  deleteRating(movieId: number) {
    this.ratingService.deleteReview(movieId).subscribe((result) => {
      if (result.success) {
        Swal.fire({
          title: "¡Hecho!",
          text: "Has borrado la review",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
