import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosePermitDialogComponent } from './close-permit-dialog.component';

describe('ClosePermitDialogComponent', () => {
  let component: ClosePermitDialogComponent;
  let fixture: ComponentFixture<ClosePermitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosePermitDialogComponent]
    });
    fixture = TestBed.createComponent(ClosePermitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
