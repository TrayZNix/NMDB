import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
