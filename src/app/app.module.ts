import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { LoginComponent } from "./components/login/login.component";
import { StoBillingViewComponent } from "./components/sto-billing/sto-billing-view/sto-billing-view.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { ConfirmationDialogService } from "./services/confirmation-dialog.service";
import { StoBillingAddComponent } from "./components/sto-billing/sto-billing-add/sto-billing-add.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { A11yModule } from "@angular/cdk/a11y";
import { BidiModule } from "@angular/cdk/bidi";
import { ObserversModule } from "@angular/cdk/observers";
import { OverlayModule } from "@angular/cdk/overlay";
import { PlatformModule } from "@angular/cdk/platform";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MenuListItemComponent } from "./components/menu-list-item/menu-list-item.component";
// import { FirstComponent } from './first/first.component';
// import { SecondComponent } from './second/second.component';
// import { ThirdComponent } from './third/third.component';
// import { FourthComponent } from './fourth/fourth.component';
import { HomeComponent } from "./components/home/home.component";
import { NavService } from "./services/nav.service";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { StoBillingComponent } from "./components/sto-billing/sto-billing.component";
import { SortableHeaderDirective } from "./directives/sortable.directive";
import { HttpClientModule } from "@angular/common/http";

/**
 * NgModule that includes all Material modules that are required.
 */
@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MenuListItemComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    StoBillingViewComponent,
    ConfirmationDialogComponent,
    StoBillingAddComponent,
    StoBillingComponent,
    SortableHeaderDirective
  ],
  imports: [
    NgbModule,
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [NavService, DecimalPipe]
})
export class AppModule {}
