import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { TokenService } from 'src/app/services/token/token.service';
import { LoginResponseData } from 'src/app/models/login-response-data';
import { Permit } from 'src/app/models/Permit';
import { PermitService } from 'src/app/services/permits/permit.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationQuestion } from 'src/app/models/VericationQuestion';
import { ApiResponseObject } from 'src/app/models/api-response-object';
import { ApproveRejectDialogComponent } from '../approve-reject-dialog/approve-reject-dialog.component';
import { ClosePermitDialogComponent } from '../close-permit-dialog/close-permit-dialog.component';

@Component({
  selector: 'app-pending-closure',
  templateUrl: './pending-closure.component.html',
  styleUrls: ['./pending-closure.component.scss']
})
export class PendingClosureComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Define MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort; //search

  
  displayedColumns: string[] = ['position', 'permitNumber', 'requesterEmail', 'referenceNumber', 'validFrom', 'validTo', 'Status', 'actions'];
  displayedData: Permit[] = [];
  GetAllPermitsPendingClosure: Permit[] = [];
  dataSource = new MatTableDataSource<Permit>(this.GetAllPermitsPendingClosure);  //paginator

  permitForm!: FormGroup;
  isSubmitting = false;
  isLoading: boolean = true;
  selectedPermitRequest: Permit | null = null; 
  isAwaitingClosure: boolean = false;
  isInfoPopUpVisible: boolean = false;
  isQuestionPopUpVisible: boolean = false;
  userId: string = '';
  currentUser: any;
  userRoles: string[] = [];
  isStoreManager: boolean = false;
  isHoS: boolean = false;
  isLineManager: boolean = false;

  constructor(
    private permitService: PermitService,
    private dialog: MatDialog,
  )
   {

   }


  ngOnInit(): void {
    this.getAllMyPermits();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
  }


        async getAllMyPermits() {
          debugger
          let resPermitsPendingClosure = await this.permitService.getPermitsPendingClosure().toPromise();
          this.GetAllPermitsPendingClosure = <Permit[]>resPermitsPendingClosure?.responseData;
          this.dataSource = new MatTableDataSource<Permit>(this.GetAllPermitsPendingClosure); //for paginator
          this.dataSource.sort = this.sort;             //for search
          this.dataSource.paginator = this.paginator;   //for paginator
        }

  // For Pop Ups
  openPopUp(request: Permit): void {
    this.selectedPermitRequest = request;
    this.isInfoPopUpVisible = true;
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

    if (this.selectedPermitRequest?.taskCompletionStatus === 'Awaiting Closure')
      {this.isAwaitingClosure = true; }
      else{this.isAwaitingClosure = false;}
    
    }

   

    openClosePermitDialogue(permit: Permit): void {
      const dialogRef = this.dialog.open(ClosePermitDialogComponent, {
        data: { permit, action: 'approve' },
        width: '500px'
      });
    
      
    }


  //Search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
