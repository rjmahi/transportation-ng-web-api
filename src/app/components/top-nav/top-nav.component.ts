import { Component, OnInit } from "@angular/core";
import { NavService } from "src/app/services/nav.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-nav",
  templateUrl: "./top-nav.component.html",
  styleUrls: ["./top-nav.component.css"]
})
export class TopNavComponent implements OnInit {
  constructor(public navService: NavService, public router: Router) {}
  navOpened = true;
  userName: any;
  ngOnInit() {
    this.userName = localStorage.getItem("user");
  }
  toggleNav() {
    if (this.navOpened) {
      this.navService.closeNav();
      this.navOpened = false;
    } else {
      this.navService.openNav();
      this.navOpened = true;
    }
  }
}
