import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-film.interface';

@Component({
  selector: 'app-cast-slide',
  templateUrl: './cast-slide.component.html',
  styleUrls: ['./cast-slide.component.css']
})
export class CastSlideComponent implements OnInit {
  
  filmImgUrl: string = 'https://image.tmdb.org/t/p/w500/';

  @Input() cast?: Cast[];

  actors: Cast[]=[];

  constructor() { }

  ngOnInit(): void {
    this.actors=this.cast;
    console.log(this.actors);
  }

  getImgUrl(profile_path: string) {
    return `${this.filmImgUrl}${profile_path}`;
  }

  imgOnError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src ='../../../assets/img/notfoundfilm404.jpg';
  }



}
