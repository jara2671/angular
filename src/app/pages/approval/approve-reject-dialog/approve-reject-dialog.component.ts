import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermitService } from 'src/app/services/permits/permit.service';
import { ApproveRequest } from 'src/app/models/approve'; // Make sure this path is correct
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approve-reject-dialog',
  templateUrl: './approve-reject-dialog.component.html',
  styleUrls: ['./approve-reject-dialog.component.scss']
})
export class ApproveRejectDialogComponent {
  comment: string = '';
  permitRequestId: number = 0; 
  constructor(
    public dialogRef: MatDialogRef<ApproveRejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permitService: PermitService,
    private toastr: ToastrService, 

  ) {}

  submit(): void {
    this.approvePermit();
  }
  
  
  private approvePermit(): void {
    const request: ApproveRequest = {
      permitRequestId: this.data.permit.id, 
      comment: this.comment
    };
  
    this.permitService.approvePermit(request).subscribe({
      next: () => {
        this.dialogRef.close({ 
          confirmed: true, 
          status: 'approved', 
          permitId: this.data.permit.id 
        });
              this.toastr.success('Permit approved successfully');
                setTimeout(() => {
                window.location.reload();
              }, 1500);
      },
      error: (err) => {
        console.error('Approval failed:', err);
        this.dialogRef.close({ 
          confirmed: false, 
          error: err, 
          permitId: this.data.permit.id 
        });
        window.location.reload();
      }
    });
  }

  close(): void {
    this.dialogRef.close({ confirmed: false });
  }
}
