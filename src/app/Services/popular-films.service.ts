import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cast, CreditsResponse } from '../interfaces/credits-film.interface';
import { FilmDetailResponse } from '../interfaces/filmdetail.interface';
import { VideoReponse, Videos } from '../interfaces/movie-video.interface';
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

  getFilmDetails(id:string){

    return this.http.get< FilmDetailResponse>(`${environment.movieDB.apiBaseUrl}/movie/${id}?api_key=${environment.movieDB.apiKey}`,{
      params:this.params
    }).pipe(
      catchError(err => of(null))
    )
  }

  getCast(id:string):Observable<Cast[]>{

    return this.http.get<CreditsResponse>(`${environment.movieDB.apiBaseUrl}/movie/${id}/credits?api_key=${environment.movieDB.apiKey}`,{
      params:this.params
    }).pipe(
      map(res=> res.cast),
      catchError(err => of([]))
    );
  }

  getVideo(id: string):Observable<Videos[]>{

    return this.http.get<VideoReponse>(`${environment.movieDB.apiBaseUrl}/movie/${id}/credits?api_key=${environment.movieDB.apiKey}`, {
      params:this.params
    }).pipe(
      map(resp => resp.results),
    )
  }

  resetFilmsPage() {
    this.filmsPage = 1;
  }
}
