
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermitService } from 'src/app/services/permits/permit.service';
import { VerificationQuestion } from 'src/app/models/VericationQuestion';
import { CreatePermitRequest } from 'src/app/models/CreatePermitRequest';
import { ApiResponseObject } from 'src/app/models/api-response-object';
import { Isolator } from 'src/app/models/isolators';
import { issuer } from 'src/app/models/permitissuer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-permit',
  templateUrl: './create-permit.component.html',
  styleUrls: ['./create-permit.component.scss']
})
export class CreatePermitComponent implements OnInit {
  permitForm!: FormGroup;
  verificationQuestions: VerificationQuestion[] = [];
  isolators: Isolator[] = [];
  issuers: issuer[] = [];

  isSubmitting = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private permitService: PermitService
  ) {}

  ngOnInit(): void {
    this.permitForm = this.fb.group({
      procedureReferenceNumber: ['', Validators.required],
      validFrom: ['', Validators.required],
      validTo: ['', Validators.required],
      descriptionOfTask: ['', Validators.required],
      permitInstructions: ['', Validators.required],
      isolatorToApprove:['', Validators.required],
      permitIssuerToApprove:['', Validators.required],
      workersVm: this.fb.array([ this.createWorkerGroup() ]),
      hazardsAndControlsResponseVm: this.fb.array([])
    });

    this.loadQuestions();
    this.loadIsolators();
    this.loadPermitIssuer();
  }
  private loadIsolators(): void {
    this.permitService.getAllIsolators()
      .subscribe({
        next: (res: ApiResponseObject<Isolator[]>) => {
          if (res.requestSuccessful) {
            this.isolators = res.responseData;
          } else {
            console.error('Failed to load isolators:', res.message);
          }
        },
        error: (err: any) => console.error('Error loading isolators', err)
      });
    }

    private loadPermitIssuer(): void {
      this.permitService.getAllPermitIssuers()
        .subscribe({
          next: (res: ApiResponseObject<issuer[]>) => {
            if (res.requestSuccessful) {
              this.issuers = res.responseData;
            } else {
              console.error('Failed to load issuers:', res.message);
            }
          },
          error: (err: any) => console.error('Error loading issuers', err)
        });
      }

  private loadQuestions(): void {
    this.permitService.getAllVerificationQuestions()
      .subscribe({
        next: (res: ApiResponseObject<VerificationQuestion[]>) => {
          if (res.requestSuccessful) {
            this.verificationQuestions = res.responseData;
            const arr = this.permitForm.get('hazardsAndControlsResponseVm') as FormArray;
            this.verificationQuestions.forEach(q => arr.push(this.createHazardControl(q.id)));
          } else {
            console.error('Failed to load questions:', res.message);
          }
        },
        error: (err: any) => console.error('Error loading questions', err)
      });
  }

  private createWorkerGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  private createHazardControl(id: number): FormGroup {
    return this.fb.group({
      verificationQuestionId: [id],
      verificationResponse: [null, Validators.required]
    });
  }

  get workersVm() { return this.permitForm.get('workersVm') as FormArray; }
  get hazardsVm() { return this.permitForm.get('hazardsAndControlsResponseVm') as FormArray; }

  addWorker() { this.workersVm.push(this.createWorkerGroup()); }
  removeWorker(i: number) { if (this.workersVm.length > 1) this.workersVm.removeAt(i); }

  addHazard() { this.hazardsVm.push(this.createHazardControl(0)); }
  removeHazard(i: number) { this.hazardsVm.removeAt(i); }

  onSubmit(): void {
    console.log('SUBMIT CLICKED', this.permitForm.valid);

    debugger
    if (this.permitForm.invalid) {
      this.permitForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const payload: CreatePermitRequest = this.permitForm.value;
    this.permitService.createPermit(payload).subscribe({
      next: (res: ApiResponseObject<any>) => {
        if (res.requestSuccessful) {
          this.toastr.success('Request created successfully');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          this.resetForm();
        } else {
          this.toastr.error(res.message);
        }
        this.isSubmitting = false;
      },
      error: err => {
        console.error('Submission error', err);
        console.log(err);
        this.toastr.error('Oops! Something went wrong. \nIt\'s not you, it\'s us. \nPlease try again');
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void { this.resetForm(); }

  private resetForm(): void {
    this.permitForm.reset();
    this.workersVm.clear();
    this.hazardsVm.clear();
    this.workersVm.push(this.createWorkerGroup());
    this.loadQuestions();
  }
}

