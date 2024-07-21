import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferpageComponent } from './transferpage.component';

describe('TransferpageComponent', () => {
  let component: TransferpageComponent;
  let fixture: ComponentFixture<TransferpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
