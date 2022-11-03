import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { actoresResponse } from "../interfaces/actors.interface";

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
}
