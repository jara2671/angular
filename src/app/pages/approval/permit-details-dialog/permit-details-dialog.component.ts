import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermitService } from 'src/app/services/permits/permit.service';
import { ApproveRejectDialogComponent } from '../approve-reject-dialog/approve-reject-dialog.component';

@Component({
  selector: 'app-permit-details-dialog',
  templateUrl: './permit-details-dialog.component.html',
  styleUrls: ['./permit-details-dialog.component.scss']
})
export class PermitDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PermitDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private permitService: PermitService
  ) {}


  close(): void {
    this.dialogRef.close();
  }

  // approvePermit(): void {
  //   const dialogRef = this.dialog.open(ApproveRejectDialogComponent, {
  //     width: '400px',
  //     data: {
  //       permit: this.data,
  //       action: 'approve'
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result?.confirmed) {
  //       const approveRequest = {
  //         permitRequestId: this.data.id,
  //         comment: result.comment
  //       };
    
  //       this.permitService.approvePermit(approveRequest, result.comment).subscribe({
  //         next: () => this.dialogRef.close({ status: 'approved' }),
  //         error: (err) => console.error('Approval failed:', err)
  //       });
  //     }
  //   });
  // }

  // rejectPermit(): void {
  //   const dialogRef = this.dialog.open(ApproveRejectDialogComponent, {
  //     width: '400px',
  //     data: {
  //       permit: this.data,
  //       action: 'reject'
  //     }
  //   });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if (result?.confirmed) {
  //   //     this.permitService.rejectPermit(this.data.id, result.comment).subscribe({
  //   //       next: () => this.dialogRef.close({ status: 'rejected' }),
  //   //       error: (err) => console.error('Rejection failed:', err)
  //   //     });
  //   //   }
  //   // });
  // }
}
