import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChedualCreatorComponent } from './chedual-creator.component';

describe('ChedualCreatorComponent', () => {
  let component: ChedualCreatorComponent;
  let fixture: ComponentFixture<ChedualCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChedualCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChedualCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
