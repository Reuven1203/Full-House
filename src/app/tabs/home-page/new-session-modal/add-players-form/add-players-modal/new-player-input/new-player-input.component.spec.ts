import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewPlayerInputComponent } from './new-player-input.component';

describe('NewPlayerInputComponent', () => {
  let component: NewPlayerInputComponent;
  let fixture: ComponentFixture<NewPlayerInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NewPlayerInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPlayerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
