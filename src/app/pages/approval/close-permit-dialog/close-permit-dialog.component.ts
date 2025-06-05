import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermitService } from 'src/app/services/permits/permit.service';
import { ApproveRequest } from 'src/app/models/approve'; // Make sure this path is correct
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-close-permit-dialog',
  templateUrl: './close-permit-dialog.component.html',
  styleUrls: ['./close-permit-dialog.component.scss']
})
export class ClosePermitDialogComponent {
  comment: string = '';
  permitRequestId: number = 0; 
  constructor(
    public dialogRef: MatDialogRef<ClosePermitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permitService: PermitService,
    private toastr: ToastrService, 

  ) {}

  submit(): void {
    this.approvePermit();
  }
  
  
  async approvePermit(){
    debugger;
    const request: ApproveRequest = {
      permitRequestId: this.data.permit.id, 
      comment: this.comment
    };

    console.log(request);
  
    this.permitService.closePermit(request).subscribe({
      next: () => {
        this.dialogRef.close({ 
          confirmed: true, 
          status: 'approved', 
          permitId: this.data.permit.id 
        });
              this.toastr.success('Permit closed successfully');
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
