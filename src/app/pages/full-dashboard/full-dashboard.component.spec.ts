import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDashboardComponent } from './full-dashboard.component';

describe('FullDashboardComponent', () => {
  let component: FullDashboardComponent;
  let fixture: ComponentFixture<FullDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
