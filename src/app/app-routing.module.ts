import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { StoBillingAddComponent } from "./components/sto-billing/sto-billing-add/sto-billing-add.component";
import { StoBillingViewComponent } from "./components/sto-billing/sto-billing-view/sto-billing-view.component";
import { StoBillingComponent } from "./components/sto-billing/sto-billing.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "add/:id/:screen",
    component: StoBillingAddComponent
  },
  {
    path: "view/:id",
    component: StoBillingViewComponent
  },
  {
    path: "sto/:id",
    component: StoBillingComponent
  },
  {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
