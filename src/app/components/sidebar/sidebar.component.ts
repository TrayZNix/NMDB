import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor() {}

  loguedIn: boolean;
  ngOnInit() {
    if (localStorage.getItem("sessionId") == null) {
      this.loguedIn = false;
    } else {
      this.loguedIn = true;
    }
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
