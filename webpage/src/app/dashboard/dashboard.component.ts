import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DashboardService} from "../service/dashboard.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  start_date: any;
  end_date: any;
  destination: any;
  status: any;
} 
  
  // const ELEMENT_DATA: PeriodicElement[] = [
    
  // ];

  // const APPROVED_DATA: PeriodicElement[] = [
  //   {start_date: 1, end_date: 'Hydrogen', destination: 1.0079, status: 'H'},
  //   {start_date: 2, end_date: 'Helium', destination: 4.0026, status: 'He'},
  //   {start_date: 3, end_date: 'Lithium', destination: 6.941, status: 'Li'},
  //   {start_date: 4, end_date: 'Beryllium', destination: 9.0122, status: 'Be'},
  //   {start_date: 5, end_date: 'Boron', destination: 10.811, status: 'B'},
  //   {start_date: 6, end_date: 'Carbon', destination: 12.0107, status: 'C'},
  //   {start_date: 7, end_date: 'Nitrogen', destination: 14.0067, status: 'N'},
  //   {start_date: 8, end_date: 'Oxygen', destination: 15.9994, status: 'O'},
  //   {start_date: 9, end_date: 'Fluorine', destination: 18.9984, status: 'F'},
  //   {start_date: 10, end_date: 'Neon', destination: 20.1797, status: 'Ne'},
  // ];

  // const PENDING_DATA: PeriodicElement[] = [
  //   {start_date: 1, end_date: 'Hydrogen', destination: 1.0079, status: 'H'},
  //   {start_date: 2, end_date: 'Helium', destination: 4.0026, status: 'He'},
  //   {start_date: 3, end_date: 'Lithium', destination: 6.941, status: 'Li'},
  //   {start_date: 4, end_date: 'Beryllium', destination: 9.0122, status: 'Be'},
  //   {start_date: 5, end_date: 'Boron', destination: 10.811, status: 'B'},
  //   {start_date: 6, end_date: 'Carbon', destination: 12.0107, status: 'C'},
  //   {start_date: 7, end_date: 'Nitrogen', destination: 14.0067, status: 'N'},
  //   {start_date: 8, end_date: 'Oxygen', destination: 15.9994, status: 'O'},
  //   {start_date: 9, end_date: 'Fluorine', destination: 18.9984, status: 'F'},
  //   {start_date: 10, end_date: 'Neon', destination: 20.1797, status: 'Ne'},
  // ];
  
  /**
   * @title Basic use of `<mat-table>` (uses display flex)
   */
  @Component({
    selector: 'dashboard.component',
    styleUrls: ['dashboard.component.css'],
    templateUrl: 'dashboard.component.html',
    providers: [NgbModalConfig, NgbModal]
  })
  export class DashboardComponent implements OnInit {
    
    pendingRequestCount : number;
    displayedColumns: string[] = ['start_date', 'end_date', 'destination', 'status'];
    dataSource : PeriodicElement[] = [];
    dataSourceApproved :  PeriodicElement[] = [];//APPROVED_DATA;
    dataSourcePending :  PeriodicElement[] = [];//PENDING_DATA;
    constructor(private formBuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
      private cookieService: CookieService,config: NgbModalConfig, private modalService: NgbModal) { }

    ngOnInit() {
      if(localStorage.getItem('LoginUserName')){
        this.showDashboard();
      }else {
        this.router.navigateByUrl('/');
      }
    }

    showDashboard() {
      console.log("cookie getall ::: " + JSON.stringify(this.cookieService.getAll()));
      this.dashboardService.getDashboardData(1).subscribe((response) => {
          console.log(response);
          this.loadData(response);
          return response;
      });
  
    }

    loadData(data){
      console.log(data["userUpcomingTravelRequests"]);
      let userUpcomingTravelRequests = data["userUpcomingTravelRequests"];
      this.dataSource = this.getTravelDatasourceData(userUpcomingTravelRequests);

      let userPendingTravelRequests = data["userPendingTravelRequests"];
      this.dataSourcePending = this.getTravelDatasourceData(userPendingTravelRequests);

      let approverApprovedTravelRequests = data["approverApprovedTravelRequests"];
      this.dataSourceApproved = this.getTravelDatasourceData(approverApprovedTravelRequests);

      this.pendingRequestCount = userPendingTravelRequests["totalElements"];
      
    }

    getTravelDatasourceData(responseData:any) {
      let results = responseData["results"];
      let resultArr : PeriodicElement[] = [] ;
      for(let result of results) {
          resultArr.push({start_date: result["travelDateFrom"], end_date: result["travelDateTo"], destination: result["travelLocationTo"], status: result["status"]});
      }
      return resultArr;
    }

    newTravelRequest(){
      this.router.navigate(['request']);
    }

  }
