import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitFormComponent } from './add-visit-form.component';

describe('AddVisitFormComponent', () => {
  let component: AddVisitFormComponent;
  let fixture: ComponentFixture<AddVisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVisitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
