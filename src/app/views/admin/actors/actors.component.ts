import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actor } from "src/app/interfaces/actors.interface";
import { ActoresService } from "src/app/Services/actores.service";

@Component({
  selector: "app-actors",
  templateUrl: "./actors.component.html",
  styleUrls: ["./actors.scss"],
})
export class ActorsComponent implements OnInit {
  listaActores: Actor[] = [];
  page: number = 1;
  limite = 10;
  pages: number = 0;
  token!: string;
  sessionId: string = "";
  username: string = "";
  avatarPath: string = "";

  constructor(private actorService: ActoresService, private router: Router) {}

  ngOnInit(): void {
    this.actualizarActores();
    this.sessionId = localStorage.getItem("sessionId") as string;
    this.username = localStorage.getItem("username") as string;
    this.avatarPath = localStorage.getItem("avatar") as string;
  }

  actualizarActores() {
    this.actorService.getActores(this.page).subscribe((result) => {
      this.listaActores = result.results;
      this.pages = result.total_pages;
    });
  }

  prevPage() {
    this.page = this.page - 1;
    this.actualizarActores();
  }
  nextPage() {
    this.page = this.page + 1;
    this.actualizarActores();
  }
  setPage(page: number) {
    this.page = page;
    this.actualizarActores();
  }
}
