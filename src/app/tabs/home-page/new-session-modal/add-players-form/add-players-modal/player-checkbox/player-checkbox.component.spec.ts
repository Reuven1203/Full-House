import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerCheckboxComponent } from './player-checkbox.component';

describe('PlayerCheckboxComponent', () => {
  let component: PlayerCheckboxComponent;
  let fixture: ComponentFixture<PlayerCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlayerCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
