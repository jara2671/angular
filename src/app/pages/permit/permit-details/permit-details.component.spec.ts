import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitDetailsComponent } from './permit-details.component';

describe('PermitDetailsComponent', () => {
  let component: PermitDetailsComponent;
  let fixture: ComponentFixture<PermitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermitDetailsComponent]
    });
    fixture = TestBed.createComponent(PermitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
