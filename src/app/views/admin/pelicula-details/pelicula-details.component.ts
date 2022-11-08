import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/credits-film.interface';
import { FilmDetailResponse, Genre } from 'src/app/interfaces/filmdetail.interface';
import { VideoReponse, Videos } from 'src/app/interfaces/movie-video.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { PopularFilmsService } from 'src/app/Services/popular-films.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrls: ['./pelicula-details.component.css']
})
export class PeliculaDetailsComponent implements OnInit {

  filmImgUrl: string = 'https://image.tmdb.org/t/p/w500/';
  film?: FilmDetailResponse;
  
  gen: Genre[] = [];

  cast: Cast[]=[];
  video: Videos[];

  constructor(private authService: AuthService, private sanitazer: DomSanitizer, private router:Router, private activatedRoute: ActivatedRoute, private filmsService: PopularFilmsService) { }

  ngOnInit(): void {

    const {id} = this.activatedRoute.snapshot.params;

    this.filmsService.getFilmDetails(id).subscribe(movie => {
      
      if(!movie) {
        this.router.navigateByUrl('/peliculas');
        return;
      }
      this.film = movie;
    });


    this.filmsService.getVideo(id).subscribe(video => {
      this.video = video;
    });
  }

  
  login() {
    let requestToken: string;
    this.authService.createRequestToken().subscribe((token) => {
      if (token.success) {
        requestToken = token.request_token;
        console.log(requestToken);
        this.authService.createSession(requestToken);
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:4200/auth/login`; //!Cambiar ip por nombre de pagina web
      } else {
        console.log("Error al pedir o recoger el token de logueo");
      }
    });
  }

  getImgUrl(backdrop: string) {
    return `${this.filmImgUrl}${backdrop}`;
  }

  imgOnError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src ='../../../assets/img/notfoundfilm404.jpg';
  }

  getUrlVideo(video: Videos) {
    let url = `https://www.youtube.com/embed/${video.key}`

    return this.sanitazer.bypassSecurityTrustResourceUrl(url)
  }

}
