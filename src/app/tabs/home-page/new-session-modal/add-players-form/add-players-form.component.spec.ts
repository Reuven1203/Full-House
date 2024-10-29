import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPlayersFormComponent } from './add-players-form.component';

describe('AddPlayersFormComponent', () => {
  let component: AddPlayersFormComponent;
  let fixture: ComponentFixture<AddPlayersFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddPlayersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlayersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
