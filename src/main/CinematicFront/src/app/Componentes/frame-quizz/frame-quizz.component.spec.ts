import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameQuizzComponent } from './frame-quizz.component';

describe('FrameQuizzComponent', () => {
  let component: FrameQuizzComponent;
  let fixture: ComponentFixture<FrameQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameQuizzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
