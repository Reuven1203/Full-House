import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlindsSelectionComponent } from './blinds-selection.component';

describe('BlindsSelectionComponent', () => {
  let component: BlindsSelectionComponent;
  let fixture: ComponentFixture<BlindsSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlindsSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlindsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
