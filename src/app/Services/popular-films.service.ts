import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Films, PopularFilmReponse } from '../interfaces/popularFilm.interface';

@Injectable({
  providedIn: 'root'
})
export class PopularFilmsService {

  private filmsPage = 1;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      language: 'en-US',
      page: this.filmsPage.toString()
    }
  }

  getPeliculas():Observable<Films []>{
    return this.http.get<PopularFilmReponse>(`${environment.movieDB.apiBaseUrl}/movie/popular?api_key=${environment.movieDB.apiKey}`,{params:this.params}).pipe(
      map((resp) => resp.results)
    );
  }


}
