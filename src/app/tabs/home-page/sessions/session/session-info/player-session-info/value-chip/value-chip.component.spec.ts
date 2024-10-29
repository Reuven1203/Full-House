import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValueChipComponent } from './value-chip.component';

describe('ValueChipComponent', () => {
  let component: ValueChipComponent;
  let fixture: ComponentFixture<ValueChipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ValueChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
