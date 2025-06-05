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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-permits',
  templateUrl: './pending-permits.component.html',
  styleUrls: ['./pending-permits.component.scss']
})
export class PendingPermitsComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Define MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort; //search

  
  displayedColumns: string[] = ['position', 'permitNumber', 'requesterEmail', 'referenceNumber', 'validFrom', 'validTo', 'Status', 'actions'];
  displayedData: Permit[] = [];
  GetPendingPermits: Permit[] = [];
  dataSource = new MatTableDataSource<Permit>(this.GetPendingPermits);  //paginator

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
        private dialog: MatDialog,
        private toastr: ToastrService, 
        private permitService: PermitService,
  )
   {

   }


  ngOnInit(): void {
    this.getPendingPermits();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
  }


        async getPendingPermits() {
          debugger
          let resPendingPermits = await this.permitService.getPendingPermits().toPromise();
          this.GetPendingPermits = <Permit[]>resPendingPermits?.responseData;
          this.dataSource = new MatTableDataSource<Permit>(this.GetPendingPermits); //for paginator
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
      this.isAwaitingClosure = true; 
    
    }

    openApprovalDialog(permit: any): void {
      const dialogRef = this.dialog.open(ApproveRejectDialogComponent, {
        data: { permit, action: 'approve' },
        width: '500px'
      });
    
      // dialogRef.afterClosed().subscribe((result) => {
      //   if (result?.confirmed) {
      //     this.permitService.approvePermit(permit.id, result.comment).subscribe({
      //       next: () => {
      //         this.toastr.success('Permit approved successfully');
      //           setTimeout(() => {
      //           window.location.reload();
      //         }, 1500);
      //         window.location.reload();
      //         this.getPendingPermits(); 
      //       },
      //       error: (err) => {
      //         console.error('Permit approval failed:', err);
      //       }
      //     });
      //   }
      // });
    }
    
  
    openRejectionDialog(permit: any): void {
      const dialogRef = this.dialog.open(ApproveRejectDialogComponent, {
        data: { permit, action: 'reject' },
        width: '500px'
      });
  
    
    }


  //Search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
