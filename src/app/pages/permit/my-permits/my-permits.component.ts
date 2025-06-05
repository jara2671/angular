import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TokenService } from 'src/app/services/token/token.service';
import { LoginResponseData } from 'src/app/models/login-response-data';
import { Permit } from 'src/app/models/Permit';
import { PermitService } from 'src/app/services/permits/permit.service';
import { VerificationQuestion } from 'src/app/models/VericationQuestion';
import { ResponseVM, VerificationResponse } from 'src/app/models/re-energizationVm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-permits',
  templateUrl: './my-permits.component.html',
  styleUrls: ['./my-permits.component.scss']
})
export class MyPermitsComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Define MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort; //search

  
  displayedColumns: string[] = ['position', 'permitNumber', 'requesterEmail', 'referenceNumber', 'validFrom', 'validTo', 'Status', 'actions'];
  displayedData: Permit[] = [];
  GetAllMyPermits: Permit[] = [];
  dataSource = new MatTableDataSource<Permit>(this.GetAllMyPermits);  //paginator

  reEnergizationQuestions: VerificationQuestion[] = [];
  isSubmitting = false;
  isLoading: boolean = true;
  selectedPermitRequest: Permit | null = null; 
  isInfoPopUpVisible: boolean = false;
  isQuestionPopUpVisible: boolean = false;
  permitRequestId: number = 0;
  isToReEnergize: boolean = false;

  userId: string = '';
  currentUser: any;
  userRoles: string[] = [];
  isStoreManager: boolean = false;
  isHoS: boolean = false;
  isLineManager: boolean = false;

  constructor(
    private toastr: ToastrService, 
    private permitService: PermitService,  
    private tokenService: TokenService,
  )
   {

   }


  ngOnInit(): void {
    this.getinfo();
    this.getAllMyPermits();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
  }


  getinfo(){
    debugger
    
      const loginResponse: LoginResponseData = this.tokenService.getInfo();
      var datas = loginResponse.permission;
      this.userId = loginResponse.profile.id;

      this.currentUser = this.tokenService.getInfo(); 
      var roles = this.currentUser.roles;
      const userRoles = roles.map((role: { roleName: any; }) => role.roleName);
      if (userRoles.length == 0)
      {
        userRoles.push('Requester');
      }
      this.userRoles = userRoles;

      this.isStoreManager = this.userRoles.includes('Store Manager');
      this.isHoS = this.userRoles.includes('HOS');
      this.isLineManager = this.userRoles.includes('Line Manager');
    } 


        async getAllMyPermits() {
          debugger
          let resGetAllMyPermits = await this.permitService.getAllMyPermits().toPromise();
          this.GetAllMyPermits = <Permit[]>resGetAllMyPermits?.responseData;
          this.dataSource = new MatTableDataSource<Permit>(this.GetAllMyPermits); //for paginator
          this.dataSource.sort = this.sort;             //for search
          this.dataSource.paginator = this.paginator;   //for paginator
        }

        async getReEnergizationQuestions() {
          debugger
          let resGetAllQuestions = await this.permitService.getAllReEnergizationQuestions().toPromise();
          this.reEnergizationQuestions = <VerificationQuestion[]>resGetAllQuestions?.responseData;      
          debugger;
        }
     
// For Pop Ups
  openPopUp(request: Permit): void {
    this.selectedPermitRequest = request;
    this.isInfoPopUpVisible = true;
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  openQuestionsPopUp(request: Permit): void {
    this.selectedPermitRequest = request;
    this.isQuestionPopUpVisible = true;

    this.permitRequestId = request.id;

    this.getReEnergizationQuestions();
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  close() {
    this.isInfoPopUpVisible = false;
    this.isQuestionPopUpVisible = false;
    document.body.style.overflow = ''; // restore scroll
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isInfoPopUpVisible || this.isQuestionPopUpVisible) {
      this.close();
    }
  }
  //Pop Ups end here
  onActionButtonClick(request: Permit){

    this.selectedPermitRequest = request;

    if (this.selectedPermitRequest?.taskCompletionStatus == 'In Progress' 
                        && this.selectedPermitRequest?.status == "Approved")
      {this.isToReEnergize = true;}
      else{this.isToReEnergize = false;} 
    }

  allQuestionsAnswered(): boolean {
    return this.reEnergizationQuestions.every(q => q.response !== undefined);
  }
  
  submitResponse(){

    if (!this.allQuestionsAnswered()) {
      return; 
    }

    this.isSubmitting = true;

    const responsesvm: ResponseVM [] = this.reEnergizationQuestions.map(q => ({
      reEnergizationQuestionId: q.id, 
      reEnergizationQuestionResponse: q.response
    }));

    const verificationResponse: VerificationResponse  = {
      permitId: this.permitRequestId,
      responsesvm: responsesvm
    };

    console.log(verificationResponse);
    debugger;

    this.permitService.submitReEnergizationResponse(verificationResponse).subscribe(
      {
        next: (data => {
          this.isSubmitting = false;
          if (data.responseCode == "00") {
            this.toastr.success('Response submitted successfully');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
          else {
            this.toastr.error(data.message);
            this.isSubmitting = false;
            this.isQuestionPopUpVisible = false;
          }
        }),
        error: ((error: any) => {
          console.log(error);
          this.toastr.error('Oops! Something went wrong. \nIt\'s not you, it\'s us. \nPlease try again');
        }),
        complete: () => {
          this.isSubmitting = false; 
          this.isQuestionPopUpVisible = false;
        }
      }
    );


  }

  //Search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
