import { Component, OnInit, Input } from "@angular/core";
import { Result } from "../../../interfaces/favorites.interface";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  @Input() peliculas: Result[];
  constructor() {}

  ngOnInit(): void {}
}
