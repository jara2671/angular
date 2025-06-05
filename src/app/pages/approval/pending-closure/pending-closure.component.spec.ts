import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingClosureComponent } from './pending-closure.component';

describe('PendingClosureComponent', () => {
  let component: PendingClosureComponent;
  let fixture: ComponentFixture<PendingClosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingClosureComponent]
    });
    fixture = TestBed.createComponent(PendingClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
