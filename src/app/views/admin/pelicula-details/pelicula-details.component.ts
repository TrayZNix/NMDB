import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-film.interface';
import { FilmDetailResponse } from 'src/app/interfaces/filmdetail.interface';
import { VideoReponse } from 'src/app/interfaces/movie-video.interface';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrls: ['./pelicula-details.component.css']
})
export class PeliculaDetailsComponent implements OnInit {

  film?: FilmDetailResponse;
  cast: Cast[]=[];
  video: VideoReponse;

  constructor() { }

  ngOnInit(): void {
  }

}
