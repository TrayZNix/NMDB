import { Component, Input, OnInit } from '@angular/core';
import { Films } from 'src/app/interfaces/popularFilm.interface';

@Component({
  selector: 'app-films-card',
  templateUrl: './films-card.component.html',
  styleUrls: ['./films-card.component.css']
})
export class FilmsCardComponent implements OnInit {

  @Input() movies?: Films[];

  movie: Films[] = [];
  filmImgUrl: string = 'https://image.tmdb.org/t/p/w500/';

  constructor() { }

  ngOnInit(): void {
  }

}
