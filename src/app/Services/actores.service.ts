import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  actoresResponse,
  PersonaResponse,
} from "../interfaces/actors.interface";
import { ResponseMovieCredits } from "../interfaces/credits.interface";

@Injectable({
  providedIn: "root",
})
export class ActoresService {
  constructor(private http: HttpClient) {}

  getActores(page: number): Observable<actoresResponse> {
    // &language=${environment.movieDB.queryLanguage}
    return this.http.get<actoresResponse>(
      `${environment.movieDB.apiBaseUrl}/person/popular?api_key=${environment.movieDB.apiKey}&page=${page}`
    );
  }
  getPerson(id: string): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(
      `${environment.movieDB.apiBaseUrl}/person/${id}?api_key=${environment.movieDB.apiKey}`
    );
  }
  getCredits(id: string): Observable<ResponseMovieCredits> {
    return this.http.get<ResponseMovieCredits>(
      `${environment.movieDB.apiBaseUrl}/person/${id}/movie_credits?api_key=${environment.movieDB.apiKey}`
    );
  }
}
