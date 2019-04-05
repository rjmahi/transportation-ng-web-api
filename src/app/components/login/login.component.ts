import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { StoApiAccessService } from "src/app/services/sto-api-access.service";
import { NgForm } from "@angular/forms";
import { NavService } from "src/app/services/nav.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoggedIn = localStorage.getItem("login") === "true" ? true : false;
  userName: string;
  userPassword: string;

  constructor(
    public router: Router,
    public api: StoApiAccessService,
    public navService: NavService
  ) {}
  @ViewChild("loginForm") loginForm: NgForm;
  ngOnInit() {
    if (
      this.isLoggedIn !== null &&
      this.isLoggedIn !== undefined &&
      this.isLoggedIn
    ) {
      this.router.navigate(["/home"]);
    }
  }

  submitCreds() {
    this.api
      .checkUserExists(this.userName, this.userPassword)
      .subscribe(res => {
        if (res != null) {
          if (res) {
            localStorage.setItem("login", "true");
            localStorage.setItem("user", this.userName);
            this.navService.openNav();
            this.router.navigate(["/home"]);
          } else {
            alert("Invalid Credentials.");
            this.loginForm.resetForm({});
          }
        }
      });
  }
}
