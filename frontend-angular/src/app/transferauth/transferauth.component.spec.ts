import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferauthComponent } from './transferauth.component';

describe('TransferauthComponent', () => {
  let component: TransferauthComponent;
  let fixture: ComponentFixture<TransferauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferauthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
