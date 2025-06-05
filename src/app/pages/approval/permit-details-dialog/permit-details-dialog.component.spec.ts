import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitDetailsDialogComponent } from './permit-details-dialog.component';

describe('PermitDetailsDialogComponent', () => {
  let component: PermitDetailsDialogComponent;
  let fixture: ComponentFixture<PermitDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermitDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(PermitDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
