import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCardComponent } from './visit-card.component';

describe('VisitCardComponent', () => {
  let component: VisitCardComponent;
  let fixture: ComponentFixture<VisitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
