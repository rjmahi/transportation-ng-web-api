import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { VERSION } from "@angular/material";
import { NavItem } from "./models/nav-item";
import { NavService } from "./services/nav.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  @ViewChild("appDrawer") appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: "First Mile",
      iconName: "recent_actors",
      route: "devfestfl",
      children: [
        {
          displayName: "Home",
          iconName: "home",
          route: "/home"
        },
        {
          displayName: "STO",
          iconName: "group",
          route: "/sto/sto"
        },
        {
          displayName: "Gate Out pending",
          iconName: "group",
          route: "/sto/gateOut"
        },
        {
          displayName: "Gate Out History",
          iconName: "group",
          route: "/sto/gateOutHistory"
        },
        {
          displayName: "Goods Receipt Pending",
          iconName: "group",
          route: "/sto/receive"
        },
        {
          displayName: "Goods Receipt History",
          iconName: "group",
          route: "/sto/receiveHistory"
        }
      ]
    },
    {
      displayName: "Last Mile",
      iconName: "group"
    },
    {
      displayName: "Logout",
      iconName: "logout",
      route: "/"
    }
  ];

  constructor(private navService: NavService) {}

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
