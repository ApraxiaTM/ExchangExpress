import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReceiverComponent } from './insert-receiver.component';

describe('InsertReceiverComponent', () => {
  let component: InsertReceiverComponent;
  let fixture: ComponentFixture<InsertReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertReceiverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
