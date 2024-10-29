import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlindsModalComponent } from './blinds-modal.component';

describe('BlindsModalComponent', () => {
  let component: BlindsModalComponent;
  let fixture: ComponentFixture<BlindsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlindsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlindsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
