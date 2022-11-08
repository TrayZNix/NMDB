import { Component, OnInit } from "@angular/core";
import { RatedMovie } from "src/app/interfaces/ratings.interface";
import { AuthService } from "src/app/Services/auth.service";
import { RatingsService } from "src/app/Services/ratings.service";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
})
export class ReviewsComponent implements OnInit {
  accountId!: number;
  ratedMovies!: RatedMovie[]
  constructor(private ratingService: RatingsService, private authService: AuthService) {}

  ngOnInit(): void {
    let sessionId = localStorage.getItem('sessionId');
    this.authService.getAccountDetails(sessionId).subscribe(result => {


      this.accountId = result.id
      this.ratingService.getRatedFilms(this.accountId, sessionId).subscribe(result => {
        this.ratedMovies = result.results
      })
    })
  }
}
