import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Films, PopularFilmReponse } from '../interfaces/popularFilm.interface';

@Injectable({
  providedIn: 'root'
})
export class PopularFilmsService {

  private filmsPage = 1;
  private loader = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      language: 'en-US',
      page: this.filmsPage.toString()
    }
  }

  getPeliculas():Observable<Films []>{
    
    if (this.loader) {
      return of([]);
    }
    this.loader=true;
    console.log('ver pelis cargadas')

    return this.http.get<PopularFilmReponse>(`${environment.movieDB.apiBaseUrl}/movie/popular?api_key=${environment.movieDB.apiKey}`,{params:this.params}).pipe(
      map((resp) => resp.results), 
      tap(()=> { 
      this.filmsPage+=1;
      this.loader=false;
      })
    )
  }
  
  resetFilmsPage() {
    this.filmsPage = 1;
  }
}