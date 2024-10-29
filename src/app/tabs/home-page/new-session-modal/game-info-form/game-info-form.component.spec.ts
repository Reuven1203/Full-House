import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameInfoFormComponent } from './game-info-form.component';

describe('GameInfoFormComponent', () => {
  let component: GameInfoFormComponent;
  let fixture: ComponentFixture<GameInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GameInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
