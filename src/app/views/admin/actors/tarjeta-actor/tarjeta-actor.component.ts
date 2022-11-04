import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-tarjeta-actor",
  templateUrl: "./tarjeta-actor.component.html",
  styleUrls: ["./tarjeta-actor.component.css"],
})
export class TarjetaActorComponent implements OnInit {
  constructor() {}
  @Input() listaActores: any[] = [];
  ngOnInit(): void {}
}
