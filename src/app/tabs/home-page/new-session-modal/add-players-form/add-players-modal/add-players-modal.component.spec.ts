import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPlayersModalComponent } from './add-players-modal.component';

describe('AddPlayersModalComponent', () => {
  let component: AddPlayersModalComponent;
  let fixture: ComponentFixture<AddPlayersModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddPlayersModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlayersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
