import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerSessionInfoComponent } from './player-session-info.component';

describe('PlayerSessionInfoComponent', () => {
  let component: PlayerSessionInfoComponent;
  let fixture: ComponentFixture<PlayerSessionInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlayerSessionInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSessionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
