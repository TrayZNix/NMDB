import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import {
  ResponseEditFavorite,
  ResponseFavoriteFilms,
} from "../interfaces/favorites.interface";

@Injectable({
  providedIn: "root",
})
export class FavoriteFilmsService {
  constructor(private http: HttpClient) {}
  getFavoriteFilms(): Observable<ResponseFavoriteFilms> {
    return this.http.get<ResponseFavoriteFilms>(
      `${environment.movieDB.apiBaseUrl}/account/${localStorage.getItem(
        "accountId"
      )}/favorite/movies?api_key=${
        environment.movieDB.apiKey
      }&session_id=${localStorage.getItem("sessionId")}`
    );
  }
  setFavorite(
    movieId: number,
    value: boolean
  ): Observable<ResponseEditFavorite> {
    return this.http.post<ResponseEditFavorite>(
      `${environment.movieDB.apiBaseUrl}/account/${localStorage.getItem(
        "accountId"
      )}/favorite?api_key=${
        environment.movieDB.apiKey
      }&session_id=${localStorage.getItem("sessionId")}`,
      { media_type: "movie", media_id: movieId, favorite: value }
    );
  }
}
