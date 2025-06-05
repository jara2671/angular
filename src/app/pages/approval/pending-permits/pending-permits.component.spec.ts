import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPermitsComponent } from './pending-permits.component';

describe('PendingPermitsComponent', () => {
  let component: PendingPermitsComponent;
  let fixture: ComponentFixture<PendingPermitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingPermitsComponent]
    });
    fixture = TestBed.createComponent(PendingPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
