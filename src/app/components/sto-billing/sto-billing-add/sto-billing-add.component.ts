import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { STOModel } from "src/app/models/sto-model";
import { StoApiAccessService } from "src/app/services/sto-api-access.service";
import { UUID } from "angular2-uuid";
import { NgForm, FormControl } from "@angular/forms";
import { Location } from "@angular/common";
@Component({
  selector: "app-sto-billing-add",
  templateUrl: "./sto-billing-add.component.html",
  styleUrls: ["./sto-billing-add.component.css"]
})
export class StoBillingAddComponent implements OnInit {
  @ViewChild("stoForm") ngForm: NgForm;
  screenType: string;
  recordId: string;
  stoModel: STOModel = {
    active: "1",
    car_model: "",
    ext_color: "",
    first_mile_guid: "",
    fsc: "",
    fsc_name: "",
    gate_out_created_by: "",
    gate_out_created_date: "",
    gate_out_date: "",
    gate_out_updated_by: "",
    gate_out_updated_date: "",
    int_color: "",
    lot_num: "",
    odn: "",
    receipt_created_by: "",
    receipt_created_date: "",
    receipt_updated_by: "",
    receipt_updated_date: "",
    rsy_code: "",
    sto_created_by: "",
    sto_created_date: "",
    sto_date: new FormControl(new Date()) + "",
    sto_updated_by: "",
    sto_updated_date: "",
    sto_value: null,
    vin_num: ""
  };

  selectedDate: any;

  date = new FormControl(new Date());
  maxDate = new Date(2020, 0, 1);
  saveButtonName = "Ok";
  resetButtonName = "Reset";
  resetButtonHidden = false;
  lotNumHidden = true;
  allExceptLotNumDisabled = false;
  lotNumRequired = false;
  lotNumDisabled = false;
  userName: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: StoApiAccessService,
    public location: Location
  ) {
    this.userName = localStorage.getItem("user");

    this.route.paramMap.subscribe(params => {
      this.screenType = params.get("screen");
      this.recordId = params.get("id");
      if (
        this.screenType === "gateOut" ||
        this.screenType === "gateOutHistory"
      ) {
        this.lotNumHidden = false;
      }
      if (this.screenType === "gateOut" && this.userName === "userB") {
        this.lotNumRequired = true;
      }
      if (
        this.screenType === "stoView" ||
        this.screenType === "gateOut" ||
        this.screenType === "receive" ||
        this.screenType === "gateOutHistory" ||
        this.screenType === "receiveHistory"
      ) {
        this.allExceptLotNumDisabled = true;
      }
      if (this.screenType === "gateOutHistory") {
        this.lotNumDisabled = true;
      }
      if (
        (this.screenType === "gateOut" && this.userName === "userB") ||
        (this.screenType === "receive" && this.userName === "userA")
      ) {
        this.saveButtonName = "Confirm";
        this.resetButtonName = "Cancel";
      }
      // if (this.screenType === "gateOut" || this.screenType === "receive") {
      //   this.saveButtonName = "Confirm";
      //   this.resetButtonName = "Cancel";
      // }

      if (this.screenType === "stoEdit") {
        this.saveButtonName = "Update";
        this.resetButtonName = "Reset";
      }

      if (this.screenType === "stoAdd") {
        this.saveButtonName = "Save";
        this.resetButtonName = "Reset";
      }

      if (
        this.screenType === "gateOutHistory" ||
        this.screenType === "receiveHistory" ||
        this.screenType === "stoView"
      ) {
        this.saveButtonName = "Ok";
        this.resetButtonHidden = true;
      }

      if (
        (this.screenType === "gateOut" && this.userName === "userA") ||
        (this.screenType === "receive" && this.userName === "userB") ||
        this.screenType === "stoView"
      ) {
        this.saveButtonName = "Ok";
        this.resetButtonHidden = true;
      }

      if (this.screenType !== "stoAdd") {
        this.getFirstMileDetailsByID();
      }
      // console.log(moment('2016-01-16T16:00:00').format('MM/DD/YYYY HH:mm:ss'));
    });
  }

  ngOnInit() {}
  saveSTO() {
    const user = localStorage.getItem("user");
    const timeStamp = "11-12-2018 12:12:32";
    // const timeStamp = Date.now() + "";
    if (this.screenType === "stoAdd") {
      this.stoModel.first_mile_guid = UUID.UUID();
      this.stoModel.sto_created_by = user;
      this.stoModel.sto_created_date = timeStamp;
    } else if (this.screenType === "stoEdit") {
      this.stoModel.sto_updated_by = user;
      this.stoModel.sto_updated_date = timeStamp;
    } else if (this.screenType === "gateOut") {
      this.stoModel.gate_out_created_by = user;
      this.stoModel.gate_out_created_date = timeStamp;
    } else if (this.screenType === "receive") {
      this.stoModel.receipt_created_by = user;
      this.stoModel.receipt_created_date = timeStamp;
    }
    if (this.screenType === "stoAdd" && this.userName === "userB") {
      this.stoModel.sto_date =
        this.selectedDate.day +
        "-" +
        this.selectedDate.month +
        "-" +
        this.selectedDate.year;
      this.saveSTOToDB();
    } else if (
      (this.screenType === "stoEdit" && this.userName === "userB") ||
      (this.screenType === "gateOut" && this.userName === "userB") ||
      (this.screenType === "receive" && this.userName === "userA")
    ) {
      this.stoModel.sto_date =
        this.selectedDate.day +
        "-" +
        this.selectedDate.month +
        "-" +
        this.selectedDate.year;

      this.updateSTOToDB();
    } else {
      this.location.back();
    }
  }

  getFirstMileDetailsByID() {
    this.api.getSTORecordByID(this.recordId).subscribe(
      response => {
        if (response != null) {
          this.stoModel = response;
          this.selectedDate = this.stoModel.sto_date;
          console.log(this.selectedDate);
        }
      },
      error => {
        console.error("Error Details:", error);
      }
    );
  }

  saveSTOToDB() {
    this.api.saveSTORecord(this.stoModel).subscribe(
      response => {
        if (response != null) {
          console.log(response);
          this.location.back();
        }
      },
      error => {
        console.error("Unhandled Error: ", error);
      }
    );
  }

  updateSTOToDB() {
    this.api.updateSTORecord(this.stoModel).subscribe(
      response => {
        if (response != null) {
          console.log(response);
          this.location.back();
        }
      },
      error => {
        console.error("Unhandled Error: ", error);
      }
    );
  }

  resetForm() {
    if (this.resetButtonName === "Reset") {
      this.ngForm.resetForm({});
    } else {
      this.location.back();
    }
  }
}
