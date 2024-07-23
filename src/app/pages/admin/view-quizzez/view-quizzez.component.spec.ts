import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizzezComponent } from './view-quizzez.component';

describe('ViewQuizzezComponent', () => {
  let component: ViewQuizzezComponent;
  let fixture: ComponentFixture<ViewQuizzezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuizzezComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQuizzezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
