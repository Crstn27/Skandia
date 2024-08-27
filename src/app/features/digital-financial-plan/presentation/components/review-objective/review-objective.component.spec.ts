import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewObjectiveComponent } from './review-objective.component';

describe('ReviewObjectiveComponent', () => {
  let component: ReviewObjectiveComponent;
  let fixture: ComponentFixture<ReviewObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewObjectiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
