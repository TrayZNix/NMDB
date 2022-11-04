import { Component, Input, OnInit } from '@angular/core';
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


  constructor() { }

  ngOnInit(): void {
  }

  getVotesAverage (movie: Films){
    return this.percentage = Number(((movie.vote_average)*10).toFixed(2));
  }

}
