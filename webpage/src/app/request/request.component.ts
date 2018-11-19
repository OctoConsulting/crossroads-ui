import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../service/request.service";
import {Router} from "@angular/router";
import { validateConfig } from '@angular/router/src/config';

export class TravelRequest {
  id: number;
  status: string;
  travelDateFrom: Date;
  travelDateTo: Date;
  travelLocationFrom: string;
  travelLocationTo: string;
  airFare: number;
  mileage: number;
  hotel: number;
  rentCar: number;
  perDiem: number;
  createdDate: Date;
  requester : Requester ;
  approver : Approver ;
}
export class Requester {
   id: number;
}
export class Approver {
  id: number;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requestForm: FormGroup;
  submitted: boolean = false;
  errorOccured: boolean = false;
  constructor(private formBuilder: FormBuilder, private requestService : RequestService, private router: Router,) { }

  ngOnInit() {
      //alert("test on load");
      this.requestForm = this.formBuilder.group({
        destination: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        airFare: ['', ],
        mileage: ['', ],
        hotel: ['', ],
        rentalCar: ['', ],
        perDiem: ['', ],
       
      });
  }

  onFormSubmit(){
    
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    
    var travelRequest:TravelRequest = new TravelRequest();
    var requester:Requester = new Requester();
    requester.id= 1;
    var approver:Approver  = new Approver();
    approver.id = 3;
    travelRequest.travelLocationTo = this.requestForm.controls.destination.value;
    travelRequest.travelDateFrom = this.requestForm.controls.startDate.value;  
    travelRequest.travelDateTo = this.requestForm.controls.endDate.value;  
    travelRequest.airFare = this.requestForm.controls.airFare.value; 
    travelRequest.mileage  = this.requestForm.controls.mileage.value;
    travelRequest.hotel = this.requestForm.controls.hotel.value; 
    travelRequest.rentCar = this.requestForm.controls.rentalCar.value; 
    travelRequest.perDiem  = this.requestForm.controls.perDiem.value; 
    travelRequest.requester =  requester;
    travelRequest.approver = approver ;
    travelRequest.createdDate = new Date();
    travelRequest.status = "Pending";
    console.log(" >>>>"+JSON.stringify(travelRequest));
    this.requestService.newTravelRequestService(travelRequest).subscribe((response) => {

    
      this.router.navigate(['dashboard']);

    },
    error => {
       
        this.errorOccured = true;
    });

  }

  onCancel(){
    this.router.navigate(['dashboard']);
  }
  
  locationLookup(){
    window.open("https://www.gsa.gov/travel/plan-book/per-diem-rates/per-diem-rates-lookup", "_blank");
  }
}