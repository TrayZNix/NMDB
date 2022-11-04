import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ResponseFavoriteFilms } from "../interfaces/favorites.interface";

@Injectable({
  providedIn: "root",
})
export class FavoriteFilmsService {
  constructor(private http: HttpClient) {}
  getFavoriteFilms(): Observable<ResponseFavoriteFilms> {
    console.log(
      "call, " +
        localStorage.getItem("accountId") +
        ", " +
        localStorage.getItem("sessionId")
    );

    return this.http.get<ResponseFavoriteFilms>(
      `${environment.movieDB.apiBaseUrl}/account/${localStorage.getItem(
        "accountId"
      )}/favorite/movies?api_key=${
        environment.movieDB.apiKey
      }&session_id=${localStorage.getItem("sessionId")}`
    );
  }
}
