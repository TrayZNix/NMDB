import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-login-assistant",
  template: "<h1>Login in...</h1>",
})
export class LoginAssistantComponent implements OnInit {
  constructor(
    private adRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.adRoute.queryParams.subscribe((qParams) => {
      if (qParams["approved"] == "true") {
        this.authService
          .createSession(qParams["request_token"])
          .subscribe((sessionToken) => {
            if (sessionToken.success) {
              localStorage.setItem("sessionId", sessionToken.session_id);
              this.router.navigate(["admin/dashboard"]);
            } else {
              console.log("Error al crear sessionId");
            }
          });
      }
    });
  }
}
