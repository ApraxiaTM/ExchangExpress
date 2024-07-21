import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverlistComponent } from './receiverlist.component';

describe('ReceiverlistComponent', () => {
  let component: ReceiverlistComponent;
  let fixture: ComponentFixture<ReceiverlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiverlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiverlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
