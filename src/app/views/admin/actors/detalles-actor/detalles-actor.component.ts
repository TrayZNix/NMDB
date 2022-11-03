import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PersonaResponse } from "src/app/interfaces/actors.interface";
import { ResponseMovieCredits } from "src/app/interfaces/credits.interface";
import { ActoresService } from "src/app/Services/actores.service";

@Component({
  selector: "app-detalles-actor",
  templateUrl: "./detalles-actor.component.html",
  styleUrls: ["./detalles-actor.component.css"],
})
export class DetallesActorComponent implements OnInit {
  constructor(
    private actorService: ActoresService,
    private adRoute: ActivatedRoute
  ) {}
  person!: PersonaResponse;
  credits!: ResponseMovieCredits;
  loaded: boolean = false;

  ngOnInit(): void {
    this.adRoute.params.subscribe((param) => {
      this.actorService.getPerson(param["id"]).subscribe((result) => {
        this.person = result;
        this.loaded = true;
        this.actorService.getCredits(param["id"]).subscribe((result) => {
          this.credits = result;
        });
      });
    });
  }
}
