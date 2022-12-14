import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import {
  ResponseAccountDetails,
  ResponseDeleteSession,
} from "src/app/interfaces/authorization.interface";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {
  constructor(private authService: AuthService) {}
  dropdownPopoverShow = false;
  accDetails!: ResponseAccountDetails;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
    if (localStorage.getItem("sessionId") != null) {
      this.authService
        .getAccountDetails(localStorage.getItem("sessionId"))
        .subscribe((details) => {
          this.accDetails = details;
          localStorage.setItem("accountId", details.id + "");
        });
    }
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  isLoged(): boolean {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId != null) {
      return true;
    } else {
      return false;
    }
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
