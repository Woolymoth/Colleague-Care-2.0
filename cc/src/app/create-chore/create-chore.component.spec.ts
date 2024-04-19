import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChoreComponent } from './create-chore.component';

describe('CreateChoreComponent', () => {
  let component: CreateChoreComponent;
  let fixture: ComponentFixture<CreateChoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateChoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateChoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
