import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGetRatedMovies } from '../interfaces/ratings.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRatedFilms(accountId: number, sessionId: string): Observable<ResponseGetRatedMovies>{
      return this.http.get<ResponseGetRatedMovies>(`${environment.movieDB.apiBaseUrl}/account/${accountId}/rated/movies?api_key=${environment.movieDB.apiKey}&session_id=${sessionId}`);
  }
}
