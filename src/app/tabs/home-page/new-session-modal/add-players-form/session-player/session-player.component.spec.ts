import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SessionPlayerComponent } from './session-player.component';

describe('SessionPlayerComponent', () => {
  let component: SessionPlayerComponent;
  let fixture: ComponentFixture<SessionPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SessionPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
