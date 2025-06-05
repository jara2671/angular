import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { Permit } from 'src/app/models/Permit';
import { PermitService } from 'src/app/services/permits/permit.service';
import { FormGroup } from '@angular/forms';
import { ClosePermitDialogComponent } from '../../approval/close-permit-dialog/close-permit-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-permits',
  templateUrl: './all-permits.component.html',
  styleUrls: ['./all-permits.component.scss']
})
export class AllPermitsComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Define MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort; //search

  
  displayedColumns: string[] = ['position', 'permitNumber', 'requesterEmail', 'referenceNumber', 'validFrom', 'validTo', 'Status', 'actions'];
  displayedData: Permit[] = [];
  GetAllPermits: Permit[] = [];
  dataSource = new MatTableDataSource<Permit>(this.GetAllPermits);  //paginator

  permitForm!: FormGroup;
  isSubmitting = false;
  isLoading: boolean = true;
  selectedPermitRequest: Permit | null = null; 
  isClosed: boolean = false;
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
    private router: Router,
    
  )
   {

   }


  ngOnInit(): void {
    this.getAllPermits();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
  }


        async getAllPermits() {
          debugger
          let resGetAllPermits = await this.permitService.getAllPermits().toPromise();
          this.GetAllPermits = <Permit[]>resGetAllPermits?.responseData;
          this.dataSource = new MatTableDataSource<Permit>(this.GetAllPermits); //for paginator
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

    if (this.selectedPermitRequest?.status === 'Closed')
      {this.isClosed = true; }
      else{this.isClosed = false;}
    
    }

   

    openPermitDetailsPage(permit: Permit): void {
      this.router.navigate(['/home/permit-details'], { state: { permit } });
  }

  //Search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
