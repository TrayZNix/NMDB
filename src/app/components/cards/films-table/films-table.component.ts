import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Films } from 'src/app/interfaces/popularFilm.interface';

@Component({
  selector: 'app-films-table',
  templateUrl: './films-table.component.html',
  styleUrls: ['./films-table.component.css']
})
export class FilmsTableComponent implements OnInit {
  @Input() movies?: Films[];

  movie: Films[] = [];
  filmImgUrl: string = 'https://image.tmdb.org/t/p/w500/';

  percentage: number = 0;


  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getVotesAverage (movie: Films){
    return this.percentage = Number(((movie.vote_average)*10).toFixed(2));
  }

  onFilmClick(id : string) {
    this.router.navigate(['/pelicula', id])
  }

  getImgUrl(backdrop: string) {
    return `${this.filmImgUrl}${backdrop}`;
  }

  imgOnError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src ='../../../assets/img/notfoundfilm404.jpg';
  }

  onMovieClick(movie: Films) {
    this.router.navigate(['/pelicula', movie.id]);
  }

  onActivate(event: Event) {
    window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
    });
  }

}
