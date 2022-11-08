import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  ResponseDeleteRating,
  ResponseGetRatedMovies,
  ResponsePostRating,
} from "../interfaces/ratings.interface";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RatingsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getRatedFilms(
    accountId: number,
    sessionId: string
  ): Observable<ResponseGetRatedMovies> {
    return this.http.get<ResponseGetRatedMovies>(
      `${environment.movieDB.apiBaseUrl}/account/${accountId}/rated/movies?api_key=${environment.movieDB.apiKey}&session_id=${sessionId}`
    );
  }

  rateMovie(movieId: number, value: number): Observable<ResponsePostRating> {
    return this.http.post<ResponsePostRating>(
      `${environment.movieDB.apiBaseUrl}/movie/${movieId}/rating?api_key=${
        environment.movieDB.apiKey
      }&session_id=${localStorage.getItem("sessionId")}`,
      { value: value }
    );
  }
  deleteReview(movieId: number): Observable<ResponseDeleteRating> {
    return this.http.request<ResponseDeleteRating>(
      "delete",
      `${environment.movieDB.apiBaseUrl}/movie/${movieId}/rating?api_key=${
        environment.movieDB.apiKey
      }&session_id=${localStorage.getItem("sessionId")}`
    );
  }
}
